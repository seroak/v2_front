export interface IfElseChangeDto {
  id: number;
  depth: number;
  expr: string;
  code: string;
  type: string;
}
export const isIfElseChangeDto = (item: any): item is IfElseChangeDto => {
  return (
    typeof item.id === "number" &&
    typeof item.depth === "number" &&
    typeof item.expr === "string" &&
    typeof item.code === "string" &&
    typeof item.type === "string"
  );
};
