// 시각화하는 스택에 들어가는 Var를 정의하는 타입
import { CodeItem } from "./codeItem";
export interface VisVarItem extends CodeItem {
  isLight?: boolean;
}
