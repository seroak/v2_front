import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import forPrintMockData from "@/fixtures/forPrintMockData.json";
import Home from "@/pages/Home/Home";

//브라우저에서 동작하는 목업 fetch 함수를 만들어준다
(window as any).fetch = jest.fn();

// reactQuery를 사용하는 컴포넌트를 테스트하기 위해 컴포넌트를 렌더링 하는 함수
const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("백엔드로 부터 이상한 코드를 받았을 때", () => {
  beforeEach(() => {
    jest.resetAllMocks(); //모든 mock 함수 초기화
  });

  test("submits code when button is clicked", async () => {
    ((window as any).fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [{ code: "test code" }],
    });

    renderWithQueryClient(<Home />); // Home 컴포넌트 렌더
    const button = screen.getByTestId("submit-button"); // subit-button 아이디로 찾아은 요소를 button에 할당
    fireEvent.click(button); // button을 클릭하는 이벤트 발생시킴

    await waitFor(() => {
      // waitFor 함수를 사용하여 비동기 처리가 완료될 때까지 기다린다
      expect((window as any).fetch).toHaveBeenCalledWith(
        "http://localhost:8000/v1/python",
        expect.any(Object)
      );
    });
  });
});
describe("백엔드로 부터 정상적인 코드를 받았을 때", () => {
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
        "http://localhost:8000/v1/python",
        expect.any(Object)
      );
    });
  });
});
