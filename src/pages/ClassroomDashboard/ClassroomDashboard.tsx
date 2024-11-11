import { ChangeEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import HostRoom from "./components/HostRoom";
import GuestRoom from "./components/GuestRoom";
import { useMswReadyStore } from "@/store/mswReady";
import { useQuery, useMutation } from "@tanstack/react-query";

import { createClass, getHostGuestData, getUser } from "@/services/api";
import { User } from "@/App";
import { ErrorResponse } from "@/types/apiTypes";
interface Classroom {
  id: number;
  name: string;
  totalPeople: number;
}

interface GroupData {
  result: {
    hosts: Classroom[];
    guests: Classroom[];
  };
}
const ClassroomDashboard = () => {
  const isMswReady = useMswReadyStore((state) => state.isMswReady);
  const { data: userData } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60,
    retry: 3,
    placeholderData: null,
  });
  const { data, refetch } = useQuery<GroupData>({
    queryKey: ["classroomspace"],
    queryFn: () => getHostGuestData(),
    enabled: isMswReady,
  });

  const [hostClassRooms, setHostClassRooms] = useState<Classroom[]>([]);
  const [guestClassRooms, setGuestClassRooms] = useState<Classroom[]>([]);
  const [createClassName, setCreateClassName] = useState<string>("");
  useEffect(() => {
    if (data) {
      setHostClassRooms(data.result.hosts);
      setGuestClassRooms(data.result.guests);
    }
  }, [data]);
  const changeCreateClassName = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateClassName(e.target.value);
  };
  const submitCreateClassName = () => {
    if (createClassName) {
      mutation.mutate(createClassName);
    }
  };
  const mutation = useMutation({
    mutationFn: createClass,
    onSuccess() {
      refetch();
    },
    onError(error) {
      const apiError = error as unknown as ErrorResponse;
      if (apiError.code === "LM-400001") {
        alert("클래스룸은 최소 두 글자 이상부터 생성할 수 있습니다.");
      }
      if (apiError.code === "LM-400003") {
        alert("이미 존재하는 클래스룸입니다.");
      }
    },
  });
  return (
    <div className="bg2" style={{ minWidth: "1521px" }}>
      <Header />
      <div className="group-copywriting">
        <div className="s__container">
          <div className="s__row">
            <p>Classroom</p>
            <h2>함께 배우고, 더 빨리 성장하세요!</h2>
            <span>혼자보다 함께할 때 더 많이, 더 빨리 배울 수 있습니다.</span>
          </div>
        </div>
        <img src="/image/img_copywriting.png" alt="클래스룸 이미지" />
      </div>
      <div className="group-data-wrap">
        <div className="group-data-left">
          <div className="user-info">
            <p>{userData?.name}님</p>
            <span>{userData?.email}</span>
            <ul className="user-group-data">
              <li>
                <p>강의방 수</p>
                <p>{hostClassRooms.length}</p>
              </li>
              <li>
                <p>학습방 수</p>
                <p>{guestClassRooms.length}</p>
              </li>
            </ul>
            <label htmlFor="addgroup">클래스룸 생성</label>
            <div>
              <input
                type="text"
                id="addgroup"
                placeholder="클래스룸 이름"
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
              <h3>강의방</h3>
            </div>
            <div className="title-right">
              <div className="search-wrap">
                <input type="text" placeholder="클래스룸 검색" />
                <button>
                  <img src="/image/icon_search.svg" alt="검색" />
                </button>
              </div>
            </div>
          </div>
          {hostClassRooms && hostClassRooms.length > 0 ? (
            <ul className="section-data section-data04">
              {hostClassRooms.map((item) => (
                <HostRoom key={item.id} classData={item} />
              ))}
            </ul>
          ) : (
            <div className="section-empty-classrooom">
              <img src="/image/img_none_host_classroom.png" alt="empty host classroom" />
            </div>
          )}
          <div className="section-title">
            <div className="title-left">
              <h3>학습방</h3>
            </div>
            <div className="title-right">
              <div className="search-wrap">
                <input type="text" placeholder="클래스룸 검색" />
                <button>
                  <img src="/image/icon_search.svg" alt="검색" />
                </button>
              </div>
            </div>
          </div>
          {guestClassRooms && guestClassRooms.length > 0 ? (
            <ul className="section-data section-data04">
              {guestClassRooms.map((item) => (
                <GuestRoom key={item.id} classData={item} />
              ))}
            </ul>
          ) : (
            <div className="section-empty-classrooom">
              <img src="/image/img_none_guest_classroom.png" alt="empty host classroom" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ClassroomDashboard;
