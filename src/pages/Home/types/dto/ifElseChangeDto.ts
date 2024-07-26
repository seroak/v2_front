export interface IfElseChangeDto {
  id: number;
  depth: number;
  expr: string;
  highlights: number[];
  type: string;
}
export const isIfElseChangeDto = (item: any): item is IfElseChangeDto => {
  return (
    typeof item.id === "number" &&
    typeof item.depth === "number" &&
    typeof item.expr === "string" &&
    typeof item.highlights === "object" &&
    typeof item.type === "string"
  );
};
