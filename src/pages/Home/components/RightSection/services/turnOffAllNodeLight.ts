import { AllObjectItem } from "@/pages/Home/types/codeFlow/allObjectItem";

export const turnOffAllNodeLight = (codeFlows: AllObjectItem[]): AllObjectItem[] => {
  return codeFlows.map((codeFlow) => {
    return {
      ...codeFlow,
      isLight: false,
      child: turnOffAllNodeLight(codeFlow.child),
    };
  });
};
