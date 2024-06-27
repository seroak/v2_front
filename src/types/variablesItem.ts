// 처음에 백엔드로 부터 받는 variables의 타입을 정의한 파일
export interface VariablesItem {
  name: string;
  expr: string;
  depth: number;
  type?: string;
}
