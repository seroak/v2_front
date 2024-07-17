import { AllObjectItem } from "./allObjectItem";

export interface ConditionItem {
  id: number;
  type: string;
  expr?:string;
  depth: number;
  isLight: boolean;
  child: AllObjectItem[];
}
