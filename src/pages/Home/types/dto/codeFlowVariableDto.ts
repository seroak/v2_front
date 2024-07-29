export interface CodeFlowVariableDto {
  id: number;
  depth: number;
  expr: string;
  type: string;
}

export const isCodeFlowVariableDto = (item: any): item is CodeFlowVariableDto => {
  return (
    typeof item.id === "number" &&
    typeof item.depth === "number" &&
    typeof item.expr === "string" &&
    typeof item.type === "string"
  );
};
