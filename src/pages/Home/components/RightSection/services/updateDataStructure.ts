import { CodeItem } from "@/pages/Home/types/codeItem";

// 자료구조 부분을 수정할때 실행하는 함수
export const updateDataStructure = (
  targetName: string,
  dataStructures: CodeItem[], // 원래 들어있는 자료구조 데이터
  newData: CodeItem // 수정해야하는 자료구조가 들어있는 데이터
): CodeItem[] => {
  return dataStructures.map((dataStructure) => {
    return dataStructure.name === targetName ? { ...dataStructure, ...newData } : dataStructure;
  });
};
