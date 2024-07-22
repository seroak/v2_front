// 지금 시각화를 해주어야하는 스택을 관리하기 위한 타입
export interface ActivateItem {
  id: number;
  depth: number;
  type: string;
}
