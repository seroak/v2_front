import { ChangeEvent, useEffect, useState } from "react";
import LoggedInHeader from "../components/LoggedInHeader";
import Room from "./components/Room";
import { useMswReadyStore } from "@/store/mswReady";
import { useUserStore } from "@/store/user";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getGroup } from "@/services/api";
interface Classroom {
  id: number;
  name: string;
  totalPeople: number;
}

interface GroupData {
  host: {
    classrooms: Classroom[];
  };
  guest: {
    classrooms: Classroom[];
  };
}
const Group = () => {
  const isMswReady = useMswReadyStore((state) => state.isMswReady);
  const LoggedInUserName = useUserStore((state) => state.loggedInUserName);
  const { data, refetch } = useQuery<GroupData>({
    queryKey: ["group"],
    queryFn: getGroup,
    enabled: isMswReady,
  });

  const [hostClassRooms, setHostClassRooms] = useState<Classroom[]>([]);
  const [guestClassRooms, setGuestClassRooms] = useState<Classroom[]>([]);
  const [createClassName, setCreateCalssName] = useState<string | undefined>();
  useEffect(() => {
    if (data) {
      setHostClassRooms(data.host.classrooms);
      setGuestClassRooms(data.guest.classrooms);
    }
  }, [data]);
  const changeCreateClassName = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateCalssName(e.target.value);
  };
  const submitCreateClassName = () => {
    if (createClassName) {
      mutation.mutate(createClassName);
    } else {
      console.error("클래스 이름을 입력하세요");
    }
  };
  const mutation = useMutation({
    mutationFn: async (createClass: string) => {
      return fetch("http://localhost:8080/edupi-lms/v1/classroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: createClass }),
      });
    },
    async onSuccess(data) {
      const jsonData = await data.json();
      console.log(jsonData); //성공 로그
      refetch();
    },
    onError(error) {
      console.error("클래스 생성 에러", error);
    },
  });
  return (
    <div className="bg2" style={{ minWidth: "1521px" }}>
      <LoggedInHeader />
      <div className="group-copywriting">
        <div className="s__container">
          <div className="s__row">
            <p>GROUP</p>
            <h2>함께 배우고, 더 빨리 성장하세요!</h2>
            <span>혼자보다 함께할 때 더 많이, 더 빨리 배울 수 있습니다.</span>
          </div>
        </div>
        <img src="/image/img_copywriting.png" alt="그룹이미지" />
      </div>
      <div className="group-data-wrap">
        <div className="group-data-left">
          <div className="user-info">
            <p>{LoggedInUserName}님</p>
            <span>kim0000@naver.com</span>
            <ul className="user-group-data">
              <li>
                <p>생성된 그룹 수</p>
                <p>8</p>
              </li>
              <li>
                <p>전체 학생 수</p>
                <p>400</p>
              </li>
            </ul>
            <label htmlFor="addgroup">그룹 생성</label>
            <div>
              <input
                type="text"
                id="addgroup"
                placeholder="그룹 이름"
                value={createClassName}
                onChange={changeCreateClassName} // 입력값 변경시 상태 업데이트
              />
              <button onClick={submitCreateClassName}>생성</button>
            </div>
          </div>
        </div>
        <div className="group-right">
          <div className="section-title">
            <div className="title-left">
              <h3>학습방</h3>
            </div>
            <div className="title-right">
              <div className="search-wrap">
                <input type="text" placeholder="그룹 검색" />
                <button>
                  <img src="/image/icon_search.svg" alt="검색" />
                </button>
              </div>
            </div>
          </div>
          <ul className="section-data section-data04">
            {hostClassRooms.map((item) => (
              <Room key={item.id} classData={item} />
            ))}
          </ul>
          <div className="section-title">
            <div className="title-left">
              <h3>강의방</h3>
            </div>
            <div className="title-right">
              <div className="search-wrap">
                <input type="text" placeholder="그룹 검색" />
                <button>
                  <img src="/image/icon_search.svg" alt="검색" />
                </button>
              </div>
            </div>
          </div>
          <ul className="section-data section-data04">
            {guestClassRooms.map((item) => (
              <Room key={item.id} classData={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Group;
