import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import styles from "./Visualization.module.css";
import "./gutter.css";

import LeftSection from "./components/LeftSection/LeftSection";
import RightSection from "./components/RightSection/RightSection";
import GptIcon from "./components/LeftSection/components/GptIcon";
import GptComment from "./components/LeftSection/components/GptComment";
import Split from "react-split";
import { ValidTypeDto } from "@/pages/Visualization/types/dto/ValidTypeDto";
import { fetchGuestActionRequest, getGuestStatus } from "@/services/api";
import { CodeContext } from "./context/CodeContext";
import { PreprocessedCodesContext } from "./context/PreProcessedCodesContext";
//zustand store

import { useEditorStore } from "@/store/editor";

import { useMswReadyStore } from "@/store/mswReady";
import { useGptTooltipStore } from "@/store/gptTooltip";
import Header from "../components/Header";

enum ActionType {
  ING = 1,
  COMPLETE = 2,
  HELP = 3,
}
// 원본 코드 타입 정의

const VisualizationClassroom = () => {
  const [code, setCode] = useState<any>(
    ["a = 3", "for i in range(a):", "   print(' ' * ((a - 1) - i), end = '')", "   print('*' * (2 * i + 1))"].join("\n")
  );
  const [preprocessedCodes, setPreprocessedCodes] = useState<ValidTypeDto[]>([]);
  // zustand store

  const { focus } = useEditorStore();
  const isGptToggle = useGptTooltipStore((state) => state.isGptToggle);
  const gptPin = useGptTooltipStore((state) => state.gptPin);
  const [actionType, setActionType] = useState<ActionType>(ActionType.ING);

  const { isMswReady } = useMswReadyStore((state) => state);
  const params = useParams();
  const classroomId = Number(params.classroomId);

  const { data: guestStatus, refetch } = useQuery({
    queryKey: ["vizclassroom", classroomId],
    queryFn: () => getGuestStatus(classroomId),
    enabled: isMswReady,
  });
  // 새로고침시 상태 업데이트
  useEffect(() => {
    refetch();
  });
  // guestStatus의 상태가 바뀔 때마다 actionType 업데이트
  useEffect(() => {
    setActionType(guestStatus?.result);
  }, [guestStatus]);

  const useGuestActionMutation = () => {
    return useMutation({
      mutationFn: fetchGuestActionRequest,
      onSuccess: () => {},
      onError: (error) => {
        console.error("Submit Error:", error);
      },
    });
  };
  const guestActionMutation = useGuestActionMutation();

  const handelIngRequest = () => {
    setActionType(ActionType.ING);
    guestActionMutation.mutate({ classroomId: classroomId, action: 1 });
  };
  const handleHelpRequest = () => {
    setActionType(ActionType.HELP);
    guestActionMutation.mutate({ classroomId: classroomId, action: 2 });
  };
  const handleCompleteRequest = () => {
    setActionType(ActionType.COMPLETE);
    guestActionMutation.mutate({ classroomId: classroomId, action: 3 });
  };
  return (
    <CodeContext.Provider value={{ code, setCode }}>
      <PreprocessedCodesContext.Provider value={{ preprocessedCodes, setPreprocessedCodes }}>
        <Header />

        <main className={styles.main}>
          {focus && gptPin ? <GptIcon /> : (gptPin || isGptToggle) && <GptComment />}

          <Split
            sizes={[30, 70]}
            minSize={100}
            expandToMin={false}
            gutterSize={10}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            style={{ display: "flex", width: "99vw", height: "89.2vh" }}
          >
            <LeftSection />
            <RightSection />
          </Split>
          <div className="floating-buttons">
            {actionType === ActionType.HELP && (
              <button className="btn btn-cancel" onClick={handelIngRequest}>
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6L6 18'%3E%3C/path%3E%3Cpath d='M6 6l12 12'%3E%3C/path%3E%3C/svg%3E"
                  alt="취소 아이콘"
                />
                취소
              </button>
            )}
            {actionType === ActionType.ING && (
              <button className="btn btn-help" onClick={handleHelpRequest}>
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'%3E%3C/path%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E"
                  alt="도움말 아이콘"
                />
                도움 요청
              </button>
            )}
            {actionType === ActionType.ING && (
              <button className="btn btn-complete" onClick={handleCompleteRequest}>
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 11.08V12a10 10 0 1 1-5.93-9.14'%3E%3C/path%3E%3Cpolyline points='22 4 12 14.01 9 11.01'%3E%3C/polyline%3E%3C/svg%3E"
                  alt="완료 아이콘"
                />
                완료
              </button>
            )}
            {actionType === ActionType.COMPLETE && (
              <button className="btn btn-cancel" onClick={handelIngRequest}>
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6L6 18'%3E%3C/path%3E%3Cpath d='M6 6l12 12'%3E%3C/path%3E%3C/svg%3E"
                  alt="취소 아이콘"
                />
                취소
              </button>
            )}
          </div>
        </main>
      </PreprocessedCodesContext.Provider>
    </CodeContext.Provider>
  );
};
export default VisualizationClassroom;
