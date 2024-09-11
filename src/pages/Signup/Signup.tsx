import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import PublicHeader from "../components/PublicHeader";
import PopUpModal01 from "./components/PopUpModal01";
import PopUpModal02 from "./components/PopUpModal02";
import cx from "classnames";
import styles from "./Signup.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isModal01Open, setIsModal01Open] = useState<boolean>(false);
  const openModal01 = (): void => setIsModal01Open(true);
  const closeModal01 = (): void => setIsModal01Open(false);

  const [isModal02Open, setIsModal02Open] = useState<boolean>(false);
  const openModal02 = (): void => setIsModal02Open(true);
  const closeModal02 = (): void => setIsModal02Open(false);

  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "사용자 이름은 필수입니다.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "이메일은 필수입니다.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력하세요.";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "핸드폰 번호는 필수입니다.";
    } else if (!/^010-\d{3,4}-\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "유효한 핸드폰 번호를 입력하세요.";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호는 필수입니다.";
    } else if (formData.password.length < 6 || formData.confirmPassword.length > 20) {
      newErrors.password = "비밀번호는 최소 8자 이상 20자 이하여야 합니다.";
    } else if (!/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/.test(formData.password)) {
      newErrors.password = "비밀번호는 최소 1개의 특수 문자를 포함해야 합니다";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const req = {
        email: formData.email,
        password: formData.password,
        name: formData.username,
        phoneNumber: formData.phoneNumber,
      };
      return axios.post("http://localhost:8080/edupi_user/v1/member/signup", req, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    },
    onSuccess() {
      navigate("/login");
    },
    onError(error) {
      console.error("회원가입 에러", error);
      alert("회원가입 중 오류가 발생했습니다.");
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate(formData);
    }
  };

  return (
    <div className={cx("bg-gray", { "scroll-off": isModal01Open })}>
      <PublicHeader />
      <PopUpModal01 isOpen={isModal01Open} onClose={closeModal01} />
      <PopUpModal02 isOpen={isModal02Open} onClose={closeModal02} />
      <div className="login-wrap">
        <img className="mb20" src="/image/img_logo2.png" alt="로고" />
        <p className="mb40">
          이미 계정이 있으신가요?
          <Link className="color-blue" to="/login">
            로그인
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="login-box">
            {errors.username && <div className={styles.errorMessage}>{errors.username}</div>}
            <input
              className="mb16"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="이름"
              required
            />
            {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
            <input
              className="mb16"
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일"
              required
            />
            {errors.phoneNumber && <div className={styles.errorMessage}>{errors.phoneNumber}</div>}
            <input
              className="mb16"
              type="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="하이픈(-)을 포함해서 입력해 주세요."
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
            <input
              className="mb16"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              placeholder="비밀번호"
              required
            />

            <input
              className="mb12"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 재확인"
            />
            <p className="mb32 fz14">영문, 숫자, 특수문자를 조합하여 8자 이상으로 구성해주세요.</p>
            <div className="s__checkbox-wrap">
              <div className="s__checkbox">
                <input type="checkbox" className="s__checkbox-total" id="ch01_all" />
                <label htmlFor="ch01_all">모두 동의합니다.</label>
              </div>
              <div className="s__checkbox">
                <input type="checkbox" className="s__checkbox-ck" id="ch01_01" />
                <label htmlFor="ch01_01">
                  [필수]
                  <button className="openPopup" onClick={openModal01} data-popid="popupModal01" type="button">
                    이용약관 동의
                  </button>
                </label>
              </div>
              <div className="s__checkbox mt12">
                <input type="checkbox" className="s__checkbox-ck" id="ch01_02" />
                <label htmlFor="ch01_02">
                  [필수]
                  <button className="openPopup" onClick={openModal02} data-popid="popupModal02" type="button">
                    개인정보 수집 및 이용에 관한 동의
                  </button>
                </label>
              </div>
              <div className="s__checkbox mt12">
                <input type="checkbox" className="s__checkbox-ck" id="ch01_03" />
                <label htmlFor="ch01_03">[선택] 광고 전송 및 권유에 관한 선택지 동의</label>
              </div>
            </div>
            <button className="blue-btn mt40" type="submit">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
