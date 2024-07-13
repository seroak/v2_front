import { AllObjectItem } from "./allObjectItem";

export interface ConditionItem {
  id: number;
  type: string;
  depth: number;
  isLight: boolean;
  child: AllObjectItem[];
}
