import { AllObjectItem } from "./codeFlow/allObjectItem";

export interface PrintItem {
  id: number;
  type: string;
  depth: number;
  isLight: boolean;
  expr: string;
  console: string;
  highlights: number[];
  child: AllObjectItem[];
}
