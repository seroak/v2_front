export interface ForDataToAdd {
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
