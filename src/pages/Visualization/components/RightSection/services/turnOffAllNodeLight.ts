export const turnOffAllNodeLight = (codeFlows: any[]): any[] => {
  return codeFlows.map((codeFlow) => {
    return {
      ...codeFlow,
      isLight: false,
      child: turnOffAllNodeLight(codeFlow.child),
    };
  });
};
