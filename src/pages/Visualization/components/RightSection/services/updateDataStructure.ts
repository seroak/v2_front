import { WrapperDataStructureItem } from "@/pages/Visualization/types/dataStructuresItem/wrapperDataStructureItem";
import { VariableExprArray } from "@/pages/Visualization/types/dto/variablesDto";

export const updateDataStructure = (
  targetName: string,
  dataStructures: WrapperDataStructureItem,
  newData: VariableExprArray,
  callStack: string
): WrapperDataStructureItem => {
  return {
    ...dataStructures,
    [callStack]: {
      ...dataStructures[callStack],
      data: dataStructures[callStack].data.map((dataStructure) => {
        if (dataStructure.name === targetName) {
          const start = newData.idx.start;
          const end = newData.idx.end;
          const deleteCount = end - start + 1; // start부터 end까지의 요소를 삭제
          // expr 배열의 범위 지정 후 대체
          dataStructure.expr.splice(start, deleteCount, ...newData.expr);
          return { ...dataStructure, idx: newData.idx };
        }
        return dataStructure;
      }),
    },
  };
};
