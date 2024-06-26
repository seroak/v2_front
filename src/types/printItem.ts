import { AllObjectItem } from "./allObjectItem";

export interface PrintItem {
  id: number;
  type: string;
  depth?: number;
  lightOn: boolean;
  expr: string;
  highlights: number[];
  child: AllObjectItem[];
}
