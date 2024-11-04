export const deleteCodeFlow = (codeFlows: any[], toDeleteId: number): any[] => {
  return codeFlows
    .map((codeFlow) => {
      if (codeFlow.id === toDeleteId) {
        return false;
      }
      const newCodeFlow = { ...codeFlow };
      if (newCodeFlow.child && newCodeFlow.child.length > 0) {
        newCodeFlow.child = deleteCodeFlow([...newCodeFlow.child], toDeleteId);
      }
      return newCodeFlow;
    })
    .filter((codeFlow): codeFlow is any => codeFlow !== false);
};
