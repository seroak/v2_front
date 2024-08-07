import { http, HttpResponse } from "msw";
import whileResponseBody from "./samples/whileResponseBody.json";
interface User {
  userId: string;
  userPassword: string;
}

interface SignupUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const handlers = [
  http.post("/edupi_visualize/v1/python", () => {
    return HttpResponse.json(whileResponseBody);
  }),
  http.post("/login", async ({ request }) => {
    const { userId, userPassword } = (await request.json()) as User;

    // 간단한 인증 로직을 구현
    if (userId === "test" && userPassword === "test") {
      return HttpResponse.json(
        {
          success: true,
          message: "로그인 성공",
          user: { id: userId, name: "테스트 사용자" },
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        {
          success: false,
          message: "아이디 또는 비밀번호가 잘못되었습니다",
        },
        { status: 401 }
      );
    }
  }),
  http.post("/signup", async ({ request }) => {
    const { username } = (await request.json()) as SignupUser;
    if (username === "error") return HttpResponse.json({ success: "false", message: "회원가입 실패" }, { status: 500 });
    return HttpResponse.json(
      {
        success: true,
        message: "회원가입 성공",
      },
      { status: 200 }
    );
  }),
];
