import Guest from "./components/Guest";
import { useMswReadyStore } from "@/store/mswReady";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
//zustand store
import { useAccessRightStore } from "@/store/accessRight";
import { ErrorResponse } from "@/types/apiTypes";
import { useCustomAlert } from "@/pages/components/CustomAlert";
import {
  getClassGuestData,
  deleteClassroom,
  getTotalActionInfo,
  inviteClassroom,
  getClassAccessRightData,
} from "@/services/api";
import Header from "../components/Header";

interface GuestType {
  id: number;
  email: string;
  name: string;
  status: number;
}

interface ActionInfoType {
  ing: number;
  complete: number;
  help: number;
}

interface ClassroomData {
  result: {
    guests: GuestType[];
  };
}

interface GetTotalActionInfoType {
  result: {
    className: string;
    actionInfo: ActionInfoType;
  };
}

interface ClassAccessRightDataType {
  isAccess: boolean;
  isHost: boolean;
}

const Modify = () => {
  const { openAlert, CustomAlert } = useCustomAlert();
  const params = useParams();
  const classroomId = Number(params.classroomId);
  const [guests, setGuests] = useState<GuestType[]>();
  const [guestEmail, setGuestEmail] = useState<string>("");
  const isMswReady = useMswReadyStore((state) => state.isMswReady);
  const navigate = useNavigate();
  const setIsHost = useAccessRightStore((state) => state.setIsHost);
  const { data: classroomData, refetch: classroomDataRefetch } = useQuery<GetTotalActionInfoType>({
    queryKey: ["ClassTotalActionInfo", classroomId],
    queryFn: () => getTotalActionInfo(classroomId),
    enabled: isMswReady,
  });

  const { data, refetch: getClassroomRefetch } = useQuery<ClassroomData>({
    queryKey: ["classroomData", classroomId],
    queryFn: () => getClassGuestData(classroomId),
    enabled: isMswReady,
  });
  const { data: classAccessRightData, isSuccess } = useQuery<ClassAccessRightDataType>({
    queryKey: ["classAccessRightData", classroomId],
    queryFn: () => getClassAccessRightData(classroomId),
    enabled: isMswReady,
    staleTime: 1000 * 60,
  });
  const [searchGuestTerm, setGuestSearchTerm] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      setIsHost(classAccessRightData.isHost);
      if (!classAccessRightData?.isAccess) {
        navigate("/");
      }
    }
  }, [classAccessRightData, isSuccess]);
  const changeGuestEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setGuestEmail(e.target.value);
  };
  const inviteClassroomMutation = useMutation({
    mutationFn: inviteClassroom,
    async onSuccess() {
      getClassroomRefetch();
      classroomDataRefetch();
    },
    onError(error) {
      const apiError = error as unknown as ErrorResponse;
      if (apiError.code === "LM-400006") {
        openAlert("이미 등록된 학생입니다.");
      }
      if (apiError.code === "LM-400005") {
        openAlert("해당 하는 학생이 없습니다.");
      }
    },
  });
  const submitInviteGuest = () => {
    if (guestEmail) {
      inviteClassroomMutation.mutate({ classroomId, guestEmail });
    } else {
      console.error("클래스 이름을 입력하세요");
    }
  };

  useEffect(() => {
    if (data) {
      setGuests(data.result.guests);
    }
  }, [data]);

  const deleteClassroomMutation = useMutation({
    mutationFn: deleteClassroom,
    onSuccess: () => {
      openAlert("클래스룸이 삭제되었습니다.");
      navigate("/classroomdashboard");
    },
    onError: (error) => {
      console.error("An error occurred:", error);
      openAlert("클래스룸 삭제에 실패했습니다.");
    },
  });

  const handleDeleteClassroom = () => {
    deleteClassroomMutation.mutate(classroomId);
  };

  // 검색어에 따른 필터링 적용
  const filterGuests = guests?.filter((guest) => guest.name.toLowerCase().includes(searchGuestTerm.toLowerCase()));

  return (
    <>
      <CustomAlert />
      <div className="bg">
        <Header />
        <div id="header02" className="bg-blue"></div>
        <div className="group-wrap">
          <div className="group-left">
            <img src="/image/icon_group.svg" alt="그룹" />
            <h2 className="group-title">{classroomData?.result.className}</h2>
          </div>
          <div className="group-link">
            <p className="link-name">클래스룸 초대</p>
            <div className="invite-wrap">
              <input className="invite-input" value={guestEmail} onChange={changeGuestEmail}></input>
              <button className="invite-button" onClick={submitInviteGuest}>
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
                  <input
                    type="text"
                    placeholder="학생 검색"
                    value={searchGuestTerm}
                    onChange={(e) => setGuestSearchTerm(e.target.value)} // 검색어 업데이트
                  />
                  <button>
                    <img src="/image/icon_search.svg" alt="검색" />
                  </button>
                </div>
              </div>
            </div>
            {filterGuests && filterGuests.length > 0 ? (
              <ul className="section-data section-data03">
                {filterGuests.map((guest) => (
                  <Guest key={guest.id} guest={guest} getClassroomRefetch={getClassroomRefetch} />
                ))}
              </ul>
            ) : searchGuestTerm !== "" ? (
              <div className="section-empty-progress">
                <img src="/image/img_empty_search_guest.png" alt="empty guests" />
              </div>
            ) : (
              <div className="section-empty-classroom">
                <img src="/image/img_empty_guest.png" alt="empty search host classroom" />
              </div>
            )}
            <div className="right-btns">
              <button className="red" onClick={handleDeleteClassroom}>
                <img src="/image/icon_delete.svg" alt="그룹삭제" />
                클래스룸 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modify;
