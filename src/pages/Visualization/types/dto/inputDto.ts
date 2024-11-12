export interface InputDto {
  id: number;
  depth: number;
  expr: string;
  console: string;
  code: string;
  type: string;
}

export const isInputDto = (item: any): item is InputDto => {
  return (
    typeof item.id === "number" &&
    typeof item.depth === "number" &&
    typeof item.expr === "string" &&
    typeof item.console === "string" &&
    typeof item.code === "string" &&
    typeof item.type === "string"
  );
};
