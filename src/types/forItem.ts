import { AllObjectItem } from "./allObjectItem";
export interface ForItem {
  id: number;
  start: number;
  startLightOn: boolean;
  end: number;
  endLightOn: boolean;
  cur: number;
  curLightOn: boolean;
  target: string;
  step: number;
  stepLightOn: boolean;
  type: string;
  depth?: number;
  lightOn: boolean;
  child: AllObjectItem[];
}
