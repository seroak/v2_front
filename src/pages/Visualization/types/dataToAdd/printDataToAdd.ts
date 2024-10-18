export interface PrintDataToAdd {
  id: number;
  depth: number;
  expr: string;
  highlights: number[];
  console: string | null;
  code: string;
  type: string;
}
