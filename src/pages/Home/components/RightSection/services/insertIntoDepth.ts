import { AllObjectItem } from "@/pages/Home/types/codeFlow/allObjectItem";
export const insertIntoDepth = (
  codeFlows: AllObjectItem[],
  toAddObject: AllObjectItem,
  prevTrackingId: number
): AllObjectItem[] => {
  return codeFlows.map((codeFlow) => {
    if (codeFlow.id === prevTrackingId) {
      return {
        ...codeFlow,
        child: [toAddObject, ...codeFlow.child],
      };
    } else if (codeFlow.child && codeFlow.child.length > 0) {
      return {
        ...codeFlow,
        child: insertIntoDepth(codeFlow.child, toAddObject, prevTrackingId),
      };
    } else {
      return codeFlow;
    }
  });
};
