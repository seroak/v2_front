// 시각화하는 스택에 들어가는 Var를 정의하는 타입입니다.
import { CodeItem } from "./codeItem";
export interface VarItem extends CodeItem {
  lightOn?: boolean;
}
