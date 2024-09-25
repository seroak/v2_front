jest.mock("monaco-editor", () => ({})); // 모듈을 빈 객체로 모킹
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import forPrintMockData from "./samples/successForAndPrintResponseBody.json";
import Home from "../../../src/pages/Visualization/Visualization";
import { MemoryRouter } from "react-router-dom";
// 브라우저API 모킹
(window as any).fetch = jest.fn();
window.alert = jest.fn();

// reactQuery를 사용하는 컴포넌트를 테스트하기 위해 컴포넌트를 렌더링 하는 함수
const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
    </MemoryRouter>
  );
};

describe("백엔드로 부터 Object 외에 다른 response body(code) 를 받았을 때", () => {
  beforeEach(() => {
    jest.resetAllMocks(); //모든 mock 함수 초기화
    jest.spyOn(console, "error").mockImplementation(() => {}); // console.error를 모킹
  });

  test("submits code when button is clicked", async () => {
    ((window as any).fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [{ code: "failed_response// strange_response_of_back_end" }],
    });

    renderWithQueryClient(<Home />); // Home 컴포넌트 렌더
    const button = screen.getByTestId("submit-button"); // subit-button 아이디로 찾아은 요소를 button 에 할당
    fireEvent.click(button); // button을 클릭하는 이벤트 발생시킴

    await waitFor(() => {
      // waitFor 함수를 사용하여 비동기 처리가 완료될 때까지 기다린다
      expect((window as any).fetch).toHaveBeenCalledWith(
        "http://localhost:8080/edupi-visualize/v1/python",
        expect.any(Object)
      );
    });
    expect(window.alert).toHaveBeenCalledWith("받은 데이터의 형식이 올바르지 않습니다.");
  });
});

describe("백엔드로 부터 정상적인 response body(code) 를 받았을 때", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("submits code when button is clicked", async () => {
    ((window as any).fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => forPrintMockData,
    });

    renderWithQueryClient(<Home />);
    const button = screen.getByTestId("submit-button");
    fireEvent.click(button);

    await waitFor(() => {
      // waitFor 함수를 사용하여 비동기 처리가 완료될 때까지 기다린다
      expect((window as any).fetch).toHaveBeenCalledWith(
        "http://localhost:8080/edupi-visualize/v1/python",
        expect.any(Object)
      );
    });
  });
});
