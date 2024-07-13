export interface MainFuncForElseData {
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
  