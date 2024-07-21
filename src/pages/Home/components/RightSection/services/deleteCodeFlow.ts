import { AllObjectItem } from "@/pages/Home/types/allObjectItem";

export const deleteCodeFlow = (
  codeFlows: AllObjectItem[],
  toDeleteId: number
): AllObjectItem[] => {
  return codeFlows
    .filter((codeFlow) => codeFlow.id !== toDeleteId)
    .map((codeFlow) => {
      if (codeFlow.child && codeFlow.child.length > 0) {
        return {
          ...codeFlow,
          child: deleteCodeFlow(codeFlow.child, toDeleteId),
        };
      }
      return codeFlow;
    });
};
