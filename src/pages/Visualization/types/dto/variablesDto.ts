// Type: assign 부분
export interface VariableExprArray {
  id: number;
  expr: string[];
  name: string;
  idx: { start: number; end: number };
  code: string;
  type: string;
}
export interface Variable {
  id: number;
  expr: string;
  name: string;
  idx: { start: number; end: number };
  code: string;
  type: string;
}
export interface VariablesDto {
  variables: Variable[] | VariableExprArray[];
  callStackName: string;
  type: string;
}

export const isVariablesDto = (item: any): item is VariablesDto => {
  return typeof item.variables === "object" && typeof item.type == "string" && typeof item.callStackName == "string";
};
