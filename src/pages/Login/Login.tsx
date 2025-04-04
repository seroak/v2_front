import { useState, FormEvent, ChangeEvent, Fragment, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getUser, login } from "@/services/api";
import Header from "@/pages/components/Header";
import { useCustomAlert } from "@/pages/components/CustomAlert";
const BACK_BASE_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
const FRONT_BASE_URL = import.meta.env.VITE_APP_FRONT_BASE_URL;
const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const navigate = useNavigate();

  const { refetch } = useQuery({ queryKey: ["user"], queryFn: getUser, staleTime: 1000 * 60 });

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
      openAlert("아이디 또는 비밀번호가 틀렸습니다.");
      console.error("Login error:", error);
    },
  });

  const { openAlert, CustomAlert } = useCustomAlert();
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
  const loginByNaver = () => {
    window.location.href = `${BACK_BASE_URL}/edupi-user/oauth2/authorization/naver?redirect_uri=${FRONT_BASE_URL}`;
  };
  const loginByGoogle = () => {
    window.location.href = `${BACK_BASE_URL}/edupi-user/oauth2/authorization/google?redirect_uri=${FRONT_BASE_URL}`;
  };
  // 에러 파라미터 감지 및 처리
  useEffect(() => {
    const errorMessage = new URLSearchParams(location.search).get("error");
    if (errorMessage) {
      openAlert("이미 존재하는 회원입니다");
      // 에러 메시지 표시 후 쿼리 파라미터 제거
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate]);
  return (
    <Fragment>
      <CustomAlert />
      <div className={"bg-gray"}>
        <Header />

        <div className="login-wrap">
          <img className="mb20" src="/image/img_logo2.png" alt="로고" />
          <p className="mb40">
            아직 회원이 아니신가요?
            <Link className="color-blue" to="/signup">
              회원가입
            </Link>
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
              <button className="sns-btn naver mb8" type="button" onClick={loginByNaver}>
                <img src="/image/icon_naver.png" alt="네이버" style={{ width: "30px", height: "30px" }} />
                <p style={{ color: "white", position: "relative", left: "-14px" }}>네이버로 로그인</p>
              </button>
              <button className="sns-btn goggle" type="button" onClick={loginByGoogle}>
                <img src="/image/icon_goggle.svg" alt="" />
                <p style={{ position: "relative", left: "-10px" }}>구글로 로그인</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
