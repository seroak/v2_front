import { AllObjectItem } from "@/types/allObjectItem";

// 새로운 객체를 CodeFlow에 추가하는 함수
export const addCodeFlow = (
  codeFlows: AllObjectItem[], // 현제 코드흐름 시각화 정보를 담고 있는 리스트
  newObject: AllObjectItem // 추가해야하는 객체 (이건 이름을 어떻게 지을까 toAddObject이렇게 할까)
): AllObjectItem[] => {
  //  add는 뒤에서 부터 추가한다
  let updated = false;
  return codeFlows.reduceRight<AllObjectItem[]>((acc, codeFlow) => {
    // 아직 추가하지 않았고, depth가 targetDepth - 1인 경우
    if (!updated && codeFlow.depth === newObject.depth - 1) {
      updated = true;
      // 해당 노드의 child에 새로운 객체를 추가한다
      acc.unshift({ ...codeFlow, child: [...codeFlow.child, newObject] });
    }
    // 아직 child가 있고 노드가 끝나지 않은 경우
    else if (codeFlow.child && codeFlow.child.length > 0) {
      acc.unshift({
        ...codeFlow,
        // child로 들어가서 그 안에서 재귀로 들어간다
        child: addCodeFlow(codeFlow.child, newObject),
      });
    }
    // child가 더이상 없는 경우
    else {
      // 그냥 노드를 추가한다
      acc.unshift(codeFlow);
    }
    // 더 이상 돌 곳이 없으면 누산기를 반환한다
    return acc;
  }, []);
};
