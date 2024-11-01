import { DataStructureVarsItem } from "./dataStructureVarsItem";

export interface StructureValue {
  isLight?: boolean;
  data: DataStructureVarsItem[];
}

// 전체 WarperDataStructureItem 타입 정의
export type WrapperDataStructureItem = {
  [key: string]: StructureValue;
};
