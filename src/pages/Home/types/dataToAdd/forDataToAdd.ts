export interface ForDataToAdd {
  id: number;
  depth: number;
  condition: {
    target: string;
    cur: number;
    start: number;
    end: number;
    step: string;
  };
  highlights: Array<string>;
  type: string;
}
