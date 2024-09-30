import LoggedInClassroomHeader from "@/pages/components/LoggedInClassroomHeader";
import Guest from "./components/Guest";
import { useMswReadyStore } from "@/store/mswReady";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
interface GuestType {
  guestId: number;
  email: string;
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

const Modify = () => {
  const params = useParams();
  const classroomId = params.classroomId;
  const [guests, setGuests] = useState<GuestType[]>();
  const isMswReady = useMswReadyStore((state) => state.isMswReady);
  const inviteClassroom = async (classroomId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/edupi-lms/v1/classroom/account/invite?clssroomId=${classroomId}`,
        {
          method: "POST",
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
  const getClassroomData = async () => {
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
  const { data, refetch: getClassroomRefetch } = useQuery<ClassroomData>({
    queryKey: ["classroomData"],
    queryFn: getClassroomData,
    enabled: isMswReady,
  });

  console.log(classroomId);
  useEffect(() => {
    console.log(data);
    if (data) {
      setGuests(data.result.guest);
    }
  }, [data]);

  return (
    <div className="bg">
      <LoggedInClassroomHeader classroom={classroomId} />
      <div id="header02" className="bg-blue"></div>
      <div className="group-wrap">
        <div className="group-left">
          <img src="/image/icon_group.svg" alt="그룹" />
          <h2 className="group-title">파이썬 기초 1반</h2>
        </div>
        <div className="group-link">
          <p className="link-name">클래스룸 초대</p>
          <div className="invite-wrap">
            <input className="invite-input"></input>
            <button className="invite-button">
              <p>초대하기</p>
            </button>
          </div>
        </div>
      </div>
      <div className="s__container">
        <div className="modify-s__row">
          <div className="section-title">
            <div className="title-left">
              <h3>가입된 학생</h3>
            </div>
            <div className="title-right">
              <div className="search-wrap">
                <input type="text" placeholder=" 학생 검색" />
                <button>
                  <img src="/image/icon_search.svg" alt="검색" />
                </button>
              </div>
            </div>
          </div>
          <ul className="section-data section-data03">
            {guests?.map((guest) => (
              <Guest key={guest.guestId} guest={guest} />
            ))}
          </ul>
          <div className="right-btns">
            <button className="red">
              <img src="/image/icon_delete.svg" alt="그룹삭제" />
              클래스룸 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modify;
