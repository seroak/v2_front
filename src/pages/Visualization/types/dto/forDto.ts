export interface ForDto {
  id: number;
  depth: number;
  condition: {
    target: string;
    cur: string;
    start: string;
    end: string;
    step: string;
  };
  highlights: Array<string>;
  code: string;
  type: string;
}

export const isForDto = (item: any): item is ForDto => {
  return (
    typeof item.id === "number" &&
    typeof item.depth === "number" &&
    typeof item.condition === "object" &&
    typeof item.condition.target === "string" &&
    typeof item.condition.cur === "string" &&
    typeof item.condition.start === "string" &&
    typeof item.condition.end === "string" &&
    typeof item.condition.step === "string" &&
    typeof item.highlights === "object" &&
    typeof item.code === "string" &&
    typeof item.type === "string"
  );
};
