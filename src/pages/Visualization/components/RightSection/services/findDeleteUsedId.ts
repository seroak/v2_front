import { AllObjectItem } from "@/pages/Visualization/types/codeFlow/allObjectItem";

export const findDeleteUsedId = (targetChild: AllObjectItem[]): number[] => {
  let idsToDelete: number[] = [];
  for (const codeFlow of targetChild) {
    idsToDelete.push(codeFlow.id);
    if (codeFlow.child && codeFlow.child.length > 0) {
      idsToDelete = idsToDelete.concat(findDeleteUsedId(codeFlow.child));
    }
  }

  return idsToDelete;
};
