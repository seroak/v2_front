import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enableFetchMocks } from "jest-fetch-mock";
import Home from "@/pages/Home/Home";

enableFetchMocks();

// console.error와 window.alert를 모킹합니다.
console.error = jest.fn();
window.alert = jest.fn();

describe("Home component mutation and form submission", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    // 각 테스트 전에 모든 모의 함수를 초기화합니다.
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  test("successful form submission updates preprocessed codes", async () => {
    const mockResponse = [{ id: 1, code: "processed code" }];
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:8000/v1/python",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        })
      );
    });

    // 상태 업데이트 확인 코드...
  });

  test("failed form submission shows error alert", async () => {
    fetchMock.mockRejectOnce(new Error("API Error"));

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "Submit Error:",
        expect.any(Error)
      );
      expect(window.alert).toHaveBeenCalledWith(
        "코드 처리 중 에러가 발생했습니다."
      );
    });
  });
});
