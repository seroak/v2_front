export const findTargetChild = (codeFlows: any[], toAddObject: any): any[] => {
  let targetChild: any[] = [];

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
