// child 객체안에 넣을 수 있는 모든 타입을 묶는 타입
import { ForItem } from "./forItem";
import { IfItem } from "./ifItem";
import { PrintItem } from "./printItem";
import { ElseItem } from "./elseItem";
export type AllObjectItem = PrintItem | ForItem | IfItem | ElseItem;
