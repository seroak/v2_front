import { DataStructureVarsItem } from "./dataStructureVarsItem";

// 배열 항목에 대한 유니온 타입 정의
type ArrayItem = DataStructureVarsItem;

// 각 키에 대한 값의 타입 정의
interface StructureValue {
  isActivate?: boolean;
  data: ArrayItem[];
}

// 전체 WarperDataStructureItem 타입 정의
export type WarperDataStructureItem = {
  [key: string]: StructureValue;
};
