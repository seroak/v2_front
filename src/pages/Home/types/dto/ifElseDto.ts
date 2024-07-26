export interface IfElseDto {
  depth: number;
  conditions: {
    id: number;
    type: string;
    expr: string;
  }[];
  type: string;
}
export const isIfElseDto = (item: any): item is IfElseDto => {
  return typeof item.depth === "number" && typeof item.conditions === "object" && typeof item.type === "string";
};
