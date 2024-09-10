import { AllObjectItem } from "@/pages/Visualization/types/codeFlow/allObjectItem";

export const findTargetChild = (codeFlows: AllObjectItem[], toAddObject: AllObjectItem): AllObjectItem[] => {
  let targetChild: AllObjectItem[] = [];

  for (const codeFlow of codeFlows) {
    if (codeFlow.id === toAddObject.id) {
      targetChild = codeFlow.child;
    } else if (codeFlow.child && codeFlow.child.length > 0) {
      targetChild = findTargetChild(codeFlow.child, toAddObject);
      if (targetChild.length > 0) {
        break;
      }
    }
  }

  return targetChild;
};
