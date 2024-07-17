import { AllObjectItem } from "@/pages/Home/types/allObjectItem";

// 현재 불이 켜져야하는 부분을 표시해주는 함수
export const turnOffAllLight = (
  codeFlows: AllObjectItem[] // 불이 들어와야하는 객체를 저장하는 옛날 리스트
  // 새로 불이 들어와야하는 곳의 정보를 담고있는 객체
): AllObjectItem[] => {
  // 새로 생성되는 활성화리스트를 임시로 받아서 리턴할 변수
  return codeFlows.map((codeFlow) => {
    return {
      ...codeFlow,
      isLight: false,
      child: turnOffAllLight(codeFlow.child),
    };
  });
};
