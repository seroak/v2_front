export interface IfElseDto {
  depth: number;
  conditions: {
    id: number;
    type: string;
    expr: string;
  }[];
  code: string;
  type: string;
}
export const isIfElseDto = (item: any): item is IfElseDto => {
  return (
    typeof item.depth === "number" &&
    typeof item.conditions === "object" &&
    typeof item.code === "string" &&
    typeof item.type === "string"
  );
};
