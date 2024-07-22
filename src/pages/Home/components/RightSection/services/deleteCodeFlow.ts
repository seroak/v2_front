import { AllObjectItem } from "@/pages/Home/types/allObjectItem";

export const deleteCodeFlow = (codeFlows: AllObjectItem[], toDeleteId: number): AllObjectItem[] => {
  return codeFlows
    .map((codeFlow) => {
      if (codeFlow.id === toDeleteId) {
        return null;
      }
      const newCodeFlow = { ...codeFlow };
      if (newCodeFlow.child && newCodeFlow.child.length > 0) {
        newCodeFlow.child = deleteCodeFlow([...newCodeFlow.child], toDeleteId);
      }
      return newCodeFlow;
    })
    .filter((codeFlow): codeFlow is AllObjectItem => codeFlow !== null);
};
