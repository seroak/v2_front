export interface ForDto {
  id: number;
  depth: number;
  condition: {
    target: string;
    cur: number;
    start: number;
    end: number;
    step: number;
  };
  highlights: Array<string>;
  type: string;
}

export const isForDto = (item: any): item is ForDto => {
  return (
    typeof item.id === "number" &&
    typeof item.depth === "number" &&
    typeof item.condition === "object" &&
    typeof item.highlights === "object" &&
    typeof item.type === "string"
  );
};
