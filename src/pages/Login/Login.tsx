import { useState, FormEvent, ChangeEvent, Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "@/services/api";
const BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const { refetch } = useQuery({ queryKey: ["user"], queryFn: getUser });
  const mutation = useMutation({
    mutationFn: async ({ userId, userPassword }: { userId: string; userPassword: string }) => {
      const req = { email: userId, password: userPassword };
      return await login(req);
    },
    onSuccess() {
      refetch();
      navigate("/");
    },
    onError(error) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
      console.error("Login error:", error);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ userId, userPassword });
  };
  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const handleUserPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };
  const loginByGoogle = () => {
    window.location.href = `${BASE_URL}/edupi-user/oauth2/authorization/google?redirect_uri=http://localhost:5000`;
  };
  // 에러 파라미터 감지 및 처리
  useEffect(() => {
    const errorMessage = new URLSearchParams(location.search).get("error");
    if (errorMessage) {
      alert("이미 존재하는 회원입니다");
      // 에러 메시지 표시 후 쿼리 파라미터 제거
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate]);
  return (
    <Fragment>
      <div className={"bg-gray"}>
        <PublicHeader />

        <div className="login-wrap">
          <img className="mb20" src="/image/img_logo2.png" alt="로고" />
          <p className="mb40">
            아직 회원이 아니신가요?
            <a className="color-blue" href="">
              회원가입
            </a>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="login-box">
              <input
                className="mb12"
                type="text"
                placeholder="이메일"
                value={userId}
                onChange={(e) => handleUserIdChange(e)}
              />
              <input
                className="mb12"
                type="password"
                placeholder="비밀번호"
                value={userPassword}
                onChange={(e) => {
                  handleUserPasswordChange(e);
                }}
              />

              <a className="color-blue mb24 fz14" href="">
                비밀번호를 잊어버리셨나요?
              </a>
              <button className="blue-btn" type="submit">
                로그인
              </button>
              <img className="mt24 mb24" src="/image/img_or.png" alt="" />
              <button className="sns-btn kakao mb8" type="button">
                <img src="/image/icon_kakao.svg" alt="" />
                <p>카카오로 로그인</p>
              </button>
              <button className="sns-btn goggle" type="button" onClick={loginByGoogle}>
                <img src="/image/icon_goggle.svg" alt="" />
                <p>구글로 로그인</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
