import { AllObjectItem } from "@/pages/Home/types/allObjectItem";

export const insertEqualToDepth = (
  codeFlows: AllObjectItem[],
  toAddObject: AllObjectItem,
  prevTrackingId: number
): AllObjectItem[] => {
  return codeFlows.flatMap((codeFlow) => {
    if (codeFlow.id === prevTrackingId) {
      return [codeFlow, toAddObject];
    } else if (codeFlow.child && codeFlow.child.length > 0) {
      return {
        ...codeFlow,
        child: insertEqualToDepth(codeFlow.child, toAddObject, prevTrackingId),
      };
    } else {
      return codeFlow;
    }
  });
};
