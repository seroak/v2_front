export interface CreatePrintDataToAdd {
  id: number;
  depth: number;
  expr: string;
  highlights: number[];
  console: string | null;
  type: string;
}
