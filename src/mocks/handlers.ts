import { http, HttpResponse } from "msw";
import successForAndPrintResponseBody from "./samples/successForAndPrintResponseBody.json";
interface SignupUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export const handlers = [
  http.post("/v1/python", () => {
    return HttpResponse.json(successForAndPrintResponseBody);
  }),
  http.post("/signup", async ({ request }) => {
    const { username } = (await request.json()) as SignupUser;
    if (username === "error") return HttpResponse.json({ message: "error" }, { status: 500 });
    return HttpResponse.json(
      {
        success: true,
        message: "로그인 성공",
      },
      { status: 200 }
    );
  }),
];
