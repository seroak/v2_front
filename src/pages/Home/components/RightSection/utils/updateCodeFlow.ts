import { AllObjectItem } from "@/types/allObjectItem";

// 객체를 수정해야하는 경우에 실행하는 함수
export const updateCodeFlow = (
  codeFlows: AllObjectItem[], //현제 코드흐름 시각화 정보를 담고 있는 리스트
  newObject: AllObjectItem //수정해야하는 정보를 담고 있는 객체
): AllObjectItem[] => {
  return codeFlows.map((codeFlow) => {
    // 비주얼 스택을 순회하면서 수정해야하는 위치를 찾는다
    // 발견하고 반복문이 바로 끝나는 것이 아니라 계속 돌면서 남아있는 객체도 반환해야한다
    if (codeFlow.id === newObject.id) {
      // 발견하면 들어가서 수정한다
      return { ...codeFlow, ...newObject, child: codeFlow.child };
    } else if (codeFlow.child && codeFlow.child.length > 0) {
      // 끝까지 찾아도 없으면 child로 들어가서 재귀적으로 탐색한다
      return {
        ...codeFlow,
        child: updateCodeFlow(codeFlow.child, newObject),
      };
    } else {
      // 끝까지 찾아도 없으면 그냥 객체를 반환한다
      return codeFlow;
    }
  });
};
