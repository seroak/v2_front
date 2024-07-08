import { AllObjectItem } from "./allObjectItem";

export interface IfItem {
  id: number;
  type: string;
  depth: number;
  isLight: boolean;
  child: AllObjectItem[];
}
