import { CodeFlowVariableItem } from "./codeFlow/codeFlowVariableItem";
import { ListItem } from "./listItem";
// 처음에 백엔드로 부터 받는 Assign의 타입을 정의한 파일
export interface AssignVizItem {
  variables: CodeFlowVariableItem[] | ListItem[];
  type: string;
  name: string;
}
