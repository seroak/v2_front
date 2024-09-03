import { ActivateItem } from "@/pages/Home/types/activateItem";
import { AllObjectItem } from "@/pages/Home/types/codeFlow/allObjectItem";

// 현재 불이 켜져야하는 부분을 표시해주는 함수
export const updateActivate = (
  oldActivates: ActivateItem[], // 불이 들어와야하는 객체를 저장하는 옛날 리스트
  newActivate: AllObjectItem // 새로 불이 들어와야하는 곳의 정보를 담고있는 객체
): ActivateItem[] => {
  // 새로 생성되는 활성화리스트를 임시로 받아서 리턴할 변수
  let tmpActivate: ActivateItem[] = [];

  // 옛날 활성화 리스트를 돌면서 새로운 활성화 객체의 위치를 찾아서 활성화 시켜준다
  for (let oldActivate of oldActivates) {
    if (oldActivate.depth === newActivate.depth) {
      tmpActivate.push({
        id: newActivate.id,
        depth: newActivate.depth,
        type: newActivate.type,
      });

      return tmpActivate;
    }
  }

  tmpActivate.push({
    id: newActivate.id,
    depth: newActivate.depth!,
    type: newActivate.type,
  });

  return tmpActivate;
};
