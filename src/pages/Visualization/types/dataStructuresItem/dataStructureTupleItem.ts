export interface DataStructureTupleItem {
  id: number;
  name: string;
  expr: string[];
  idx: { start: number; end: number };
  code: string;
  type: string;
  isLight?: boolean;
}
