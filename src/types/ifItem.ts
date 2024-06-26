import { AllObjectItem } from "./allObjectItem";

export interface IfItem {
  id: number;
  type: string;
  depth?: number;
  lightOn: boolean;
  child: AllObjectItem[];
}
