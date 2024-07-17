export interface PrintDto {
  id: number;
  depth: number;
  expr: string;
  highlights: Array<string>;
  console: string | null;
  type: string;
}

export const isPrintDto = (item: any): item is PrintDto => {
  return (
    typeof item.id === "number" &&
    typeof item.depth === "number" &&
    typeof item.expr === "string" &&
    typeof item.highlights === "object" &&
    (typeof item.console === "string" || item.console === null) &&
    typeof item.type === "string"
  );
};
