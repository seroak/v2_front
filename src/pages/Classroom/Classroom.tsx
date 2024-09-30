import { useState, useCallback, useEffect } from "react";
import LoggedInHeader from "../components/LoggedInHeader";
import Guest from "./components/Guest";
import { useMswReadyStore } from "@/store/mswReady";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface GuestType {
  guestId: number;
  name: string;
  status: number;
}
interface TotalInfoType {
  ing: number;
  complete: number;
  help: number;
}

interface ClassroomData {
  result: {
    className: string;
    totalInfo: TotalInfoType;
    guest: GuestType[];
  };
}
const Classroom = () => {
  const [guests, setGuests] = useState<GuestType[]>();
  const [totalInfo, setTotalInfo] = useState<TotalInfoType>();
  const isMswReady = useMswReadyStore((state) => state.isMswReady);
  const params = useParams();
  const classroomId = params.classroomId;

  // classroom 안에서 표현되는 학생 정보를 가져오는 api
  const getGusetData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/edupi-lms/v1/classroom/account/guest?clssroomId=${classroomId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

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
  const { data: progressData, refetch } = useQuery<ClassroomData>({
    queryKey: ["progress"],
    queryFn: getGusetData,
    enabled: isMswReady,
  });
  useEffect(() => {
    if (progressData) {
      setGuests(progressData.result.guest);
      setTotalInfo(progressData.result.totalInfo);
    }
  }, [progressData]);

  const useSSE = (url: string) => {
    const [data, setData] = useState(null);
    const queryClient = useQueryClient();

    const subscribe = useCallback(() => {
      const eventSource = new EventSource(url, { withCredentials: true });

      eventSource.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setData(newData);
        // setQueryData로 값 캐싱
        queryClient.setQueryData(["sse-data"], newData);
        console.log("sse");
        refetch();
      };
      eventSource.addEventListener("action", (event) => {
        const newData = JSON.parse(event.data);
        setData(newData);
        // setQueryData로 값 캐싱
        queryClient.setQueryData(["sse-data"], newData);
        console.log("서버로 부터 데이터가 옴");
        refetch();
      });
      addEventListener("message", (event) => {
        console.log("message 리스너");
        console.log(event.data);
      });
      // connection되면
      eventSource.addEventListener("open", function (e) {
        console.log("서버로 연결이 됨");
      });

      return () => {
        eventSource.close();
      };
    }, [url, queryClient]);

    // 요청을 끊을 때 일어나는 useEffect
    useEffect(() => {
      const unsubscribe = subscribe();
      return unsubscribe;
    }, [subscribe]);

    return { data };
  };

  const { data: sseData } = useSSE(`http://localhost:8080/edupi-lms/v1/progress/connect?classroomId=${classroomId}`);
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
            <ul className="progress-data">
              <li>
                <img src="/image/progress01.svg" alt="전체" />
                <div>
                  <p>전체</p>
                  <p>{totalInfo && totalInfo?.ing + totalInfo?.complete + totalInfo?.help}</p>
                </div>
              </li>
              <li>
                <img src="/image/progress02.svg" alt="미제출" />
                <div>
                  <p>제출 중</p>
                  <p>{totalInfo?.ing}</p>
                </div>
              </li>
              <li>
                <img src="/image/progress03.svg" alt="성공" />
                <div>
                  <p>제출 완료</p>
                  <p>{totalInfo?.complete}</p>
                </div>
              </li>
              <li>
                <img src="/image/progress04.svg" alt="실패" />
                <div>
                  <p>도움</p>
                  <p>{totalInfo?.help}</p>
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
            {guests?.map((guest) => (
              <Guest key={guest.guestId} guest={guest} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Classroom;
