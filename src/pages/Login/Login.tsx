import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";

const Login = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const setLoggedInUserId = useUserStore((state) => state.setLoggedInUserId);
  const setLoggedInUserPassword = useUserStore((state) => state.setLoggedInUserPassword);

  const mutation = useMutation({
    mutationFn: async ({ userId, userPassword }: { userId: string; userPassword: string }) => {
      return axios.post(
        "http://localhost:8000/login",
        { userId, userPassword },
        { headers: { "Content-Type": "application/json" } }
      );
    },
    onSuccess(data) {
      const jsonData = data.data;

      setLoggedInUserId(jsonData.user.id);
      setLoggedInUserPassword(jsonData.user.name);
    },
    onError(error) {
      console.error("Login error:", error);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기에 로그인 로직을 추가하세요
    mutation.mutate({ userId, userPassword });
  };
  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const handleUserPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };
  return (
    <div className={styles["login-container"]}>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <h2>로그인</h2>
        <div className={styles["input-group"]}>
          <input type="text" placeholder="아이디" value={userId} onChange={(e) => handleUserIdChange(e)} />
        </div>
        <div className={styles["input-group"]}>
          <input
            type="password"
            placeholder="비밀번호"
            value={userPassword}
            onChange={(e) => {
              handleUserPasswordChange(e);
            }}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};
export default Login;
