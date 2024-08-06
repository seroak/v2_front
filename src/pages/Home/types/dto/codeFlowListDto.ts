export interface CodeFlowListDto {
  id: number;
  depth: number;
  expr: string;
  type: string;
  code: string;
}

export const isCodeFlowVariableDto = (item: any): item is CodeFlowListDto => {
  return (
    typeof item.id === "number" &&
    typeof item.depth === "number" &&
    typeof item.expr === "string" &&
    typeof item.code === "string" &&
    typeof item.type === "string"
  );
};
