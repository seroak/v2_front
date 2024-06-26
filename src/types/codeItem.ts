// 백엔드로 부터 받는 데이터 타입 설정
import { ConditionItem } from "./conditionItem";
import { VariablesItem } from "./variablesItem";
export interface CodeItem {
  id?: number;
  type: string;
  depth?: number;
  value?: number;
  name?: string;
  start?: number;
  end?: number;
  cur?: number;
  expr?: string;
  highlights?: number[] | string[];
  condition?: ConditionItem;
  variables?: VariablesItem[];
}
