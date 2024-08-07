export interface CodeFlowListItem {
  id: number;
  depth: number;
  isLight: boolean;
  type: string;
  expr: string;
  child: [];
}
