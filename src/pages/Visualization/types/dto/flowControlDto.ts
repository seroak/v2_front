export interface FlowControlDto {
  id: number;
  expr: string;
  code: string;
  depth: number;
  type: string;
}

export const isFlowControlDto = (item: any): item is FlowControlDto => {
  return (
    typeof item.id === "number" &&
    typeof item.expr === "string" &&
    typeof item.code === "string" &&
    typeof item.depth === "number" &&
    typeof item.type === "string"
  );
};
