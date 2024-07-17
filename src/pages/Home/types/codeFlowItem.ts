// 백엔드로 부터 받는 데이터 타입 설정 중 코드 시각화 부분 데이터 타입
import { ConditionItem } from "./conditionItem";
import { AssignVizItem } from "./assignVizItem";
export interface CodeFlowItem {
  id?: number;
  type: string;
  depth: number;
  value?: number;
  name?: string;
  start?: number;
  end?: number;
  cur?: number;
  expr?: string;
  highlights?: number[] | string[];
  condition?: ConditionItem;
  variables?: AssignVizItem[];
}
