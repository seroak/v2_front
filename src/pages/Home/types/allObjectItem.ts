// child 객체안에 넣을 수 있는 모든 타입을 묶는 타입
import { ForItem } from "./forItem";
import { ConditionItem } from "./conditionItem";
import { PrintItem } from "./printItem";

export type AllObjectItem = PrintItem | ForItem | ConditionItem;
