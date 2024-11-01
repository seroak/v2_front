export interface DataStructureVarsItem {
  id?: number;
  name: string;
  expr: string[];
  code?: string;
  type: string;
  idx?: { start: number | string; end: number | string } | null;
  isActivate?: boolean;
  isLight?: boolean;
  highlightIdx?: number[];
}
