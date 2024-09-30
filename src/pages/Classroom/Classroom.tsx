import { useState, useCallback, useEffect } from "react";
import LoggedInHeader from "../components/LoggedInHeader";
import Guest from "./components/Guest";
import { useMswReadyStore } from "@/store/mswReady";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getProgress = async () => {
  try {
    const response = await fetch("http://localhost:8080/edupi-lms/v1/classroom", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
const Progress = () => {
  const [date, setDate] = useState<string>("2024-01-01");
  const isMswReady = useMswReadyStore((state) => state.isMswReady);
  const params = useParams();
  const classroomId = params.roomId;
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const formatDate = (dateString: string) => {
    return dateString.replace(/-/g, ". ");
  };

  const { data: progressData, refetch } = useQuery({
    queryKey: ["progress"],
    queryFn: getProgress,
    enabled: isMswReady,
  });
  useEffect(() => {}, [progressData]);
  const useSSE = (url: string) => {
    const [data, setData] = useState(null);
    const queryClient = useQueryClient();

    const subscribe = useCallback(() => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setData(newData);
        // setQueryData로 값 캐싱
        queryClient.setQueryData(["sse-data"], newData);
        refetch();
      };

      return () => {
        eventSource.close();
      };
    }, [url, queryClient]);

    useEffect(() => {
      const unsubscribe = subscribe();
      return unsubscribe;
    }, [subscribe]);

    return { data };
  };

  const { data: sseData } = useSSE(`http://localhost:8080/edupi-lms/v1/progress/connect/?classroomId=${classroomId}`);
  console.log(sseData);

  return (
    <div>
      <LoggedInHeader />
      <div className="group-wrap">
        <div className="group-left">
          <img src="/image/icon_group.svg" alt="그룹" />
          <h2 className="group-title">파이썬 기초 {classroomId}반</h2>
        </div>
      </div>
      <div className="s__container">
        <div className="s__row">
          <div className="progress-info">
            <div className="progress-date-data">
              <button>
                <img src="/image/icon_left_arrow.svg" alt="이전" />
              </button>
              <div className="progress-date">
                <input type="date" value={date} id="dateInput" onChange={handleDateChange} />
                <label htmlFor="dateInput" className="date-label">
                  {formatDate(date)}
                </label>
              </div>
              <button>
                <img src="/image/icon_right_arrow.svg" alt="다음" />
              </button>
            </div>
            <ul className="progress-data">
              <li>
                <img src="/image/progress01.svg" alt="전체" />
                <div>
                  <p>전체</p>
                  <p>23</p>
                </div>
              </li>
              <li>
                <img src="/image/progress02.svg" alt="미제출" />
                <div>
                  <p>미제출</p>
                  <p>9</p>
                </div>
              </li>
              <li>
                <img src="/image/progress03.svg" alt="성공" />
                <div>
                  <p>성공</p>
                  <p>8</p>
                </div>
              </li>
              <li>
                <img src="/image/progress04.svg" alt="실패" />
                <div>
                  <p>실패</p>
                  <p>0</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="section-title">
            <div className="title-left">
              <h3>제출현황</h3>
            </div>
            <div className="title-right">
              <select name="" id="" className="s__select">
                <option value="1">이름순</option>
                <option value="2">제출순</option>
                <option value="3">학번순</option>
              </select>
            </div>
          </div>
          <ul className="section-data section-data01">
            <Guest />
            <li>
              <a href="#">
                <div>
                  <p>홍길동</p>
                  <span>제출시간 14:02</span>
                </div>
                <div className="progress-fail">
                  <p>실패</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div>
                  <p>홍길동</p>
                  <span>제출시간 --:--</span>
                </div>
                <div className="progress-not">
                  <p>미제출</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div>
                  <p>홍길동</p>
                  <span>제출시간 14:02</span>
                </div>
                <div className="progress-success">
                  <p>성공</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div>
                  <p>홍길동</p>
                  <span>제출시간 14:02</span>
                </div>
                <div className="progress-fail">
                  <p>실패</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div>
                  <p>홍길동</p>
                  <span>제출시간 --:--</span>
                </div>
                <div className="progress-not">
                  <p>미제출</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    </div>
  );
};
export default Progress;
