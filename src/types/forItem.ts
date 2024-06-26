import { AllObjectItem } from "./allObjectItem";
export interface ForItem {
  id: number;
  start: number;
  startIsLight: boolean;
  end: number;
  endIsLight: boolean;
  cur: number;
  curIsLight: boolean;
  target: string;
  step: number;
  stepIsLight: boolean;
  type: string;
  depth?: number;
  isLight: boolean;
  child: AllObjectItem[];
}
