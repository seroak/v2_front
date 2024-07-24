import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderingCodeFlow } from "@/pages/Home/components/RightSection/renderingCodeFlow.tsx";
import { ForItem } from "@/pages/Home/types/forItem";
type Props = {
  children: ReactNode;
  forItem: ForItem;
};
// ForBox 컴포넌트 모킹
// ForBox의 실제 경로에서 forItem과 children인자만 가지고와서 사용한다
jest.mock("@/pages/Home/components/RightSection/components/ForBox/ForBox", () => ({ forItem, children }: Props) => (
  // 실제 ForBox의 컴포넌트를 가지고 오는 것이 아닌 가짜로 만들어서 사용
  <div data-testid="for-box">
    For Box: {forItem.id}
    <div data-testid="for-children">{children}</div>
  </div>
));

describe("renderingCodeFlow 함수", () => {
  it("forBox 컴포넌트 하나만 출력하는 테스트", () => {
    const mockCodeFlows = [
      {
        cur: 0,
        depth: 1,
        end: 3,
        id: 1,
        isCurLight: true,
        isEndLight: true,
        isLight: false,
        isStartLight: true,
        isStepLight: true,
        start: 0,
        step: 2,
        target: "i",
        type: "for",
        child: [],
      },
    ];

    render(<>{renderingCodeFlow(mockCodeFlows)}</>);

    // ForBox가 렌더링되었는지 확인
    // 테스트를 위해 만든 가짜 ForBox 컴포넌트를 사용
    const forBox = screen.getByTestId("for-box");
    // 생성한 DOM요소에 For Box가 있는지 확인
    expect(forBox).toBeInTheDocument();
    // forBox요소안에 해당 텍스트가 있는지 확인
    expect(forBox).toHaveTextContent("For Box: 1");
  });

  it("이중 for문 컴포넌트 테스트", () => {
    const mockCodeFlows = [
      {
        cur: 0,
        depth: 1,
        end: 3,
        id: 1,
        isCurLight: true,
        isEndLight: true,
        isLight: false,
        isStartLight: true,
        isStepLight: true,
        start: 0,
        step: 2,
        target: "i",
        type: "for",
        child: [
          {
            cur: 0,
            depth: 1,
            end: 3,
            id: 2,
            isCurLight: true,
            isEndLight: true,
            isLight: false,
            isStartLight: true,
            isStepLight: true,
            start: 0,
            step: 2,
            target: "i",
            type: "for",
            child: [],
          },
        ],
      },
    ];

    render(<>{renderingCodeFlow(mockCodeFlows)}</>);

    // 외부 ForBox가 렌더링되었는지 확인
    const outerForBox = screen.getByText("For Box: 1");
    expect(outerForBox).toBeInTheDocument();

    // 내부 ForBox가 렌더링되었는지 확인
    const innerForBox = screen.getByText("For Box: 2");
    expect(innerForBox).toBeInTheDocument();
  });
});
