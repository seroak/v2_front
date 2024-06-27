import { AllObjectItem } from "./allObjectItem";
export interface ForItem {
  id: number;
  start: number;
  isStartLight: boolean;
  end: number;
  isEndLight: boolean;
  cur: number;
  isCurLight: boolean;
  target: string;
  step: number;
  isStepLight: boolean;
  type: string;
  depth?: number;
  isLight: boolean;
  child: AllObjectItem[];
}
