import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import PublicHeader from "../components/PublicHeader";
import TermsOfServiceModal from "./components/TermsOfServiceModal";
import ConsentInformationModal from "./components/ConsentInformationModal";
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
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isContainsTwoTypes, setContainsTwoTypes] = useState<number>(0);
  const [isMoreOrLess, setMoreOrLess] = useState<number>(0);
  const [isConsecutiveChar, setConsecutiveChar] = useState<number>(0);
  const [isViewHidden, setIsViewHidden] = useState<boolean>(true);
  const [isViewHiddenConfirm, setIsViewHiddenConfirm] = useState<boolean>(true);
  const [isValidEmail, setValidEmail] = useState<number>(0); // 이메일이 유효한지 체크하는 state
  const [isValidPhoneNumber, setValidPhoneNumber] = useState<number>(0); // 전화번호가 유효한지 체크하는 state
  const [isValidConfirmPassword, setValidConfirmPassword] = useState<number>(0); // 비밀번호가 일치하는지 체크하는 state
  const [isTermsOfServiceModalOpen, setIsTermsOfServiceModalOpen] = useState<boolean>(false);

  const openTermsOfServiceModal = (): void => setIsTermsOfServiceModalOpen(true);
  const closeTermsOfServiceModal = (): void => setIsTermsOfServiceModalOpen(false);

  const [isConsentInformationModalOpen, setIsConsentInformationModalOpen] = useState<boolean>(false);
  const openConsentInformationModal = (): void => setIsConsentInformationModalOpen(true);
  const closeConsentInformationModal = (): void => setIsConsentInformationModalOpen(false);

  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");

    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };

  const phoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    if (/^010-\d{3,4}-\d{4}$/.test(trimmedValue)) {
      setValidPhoneNumber(2);
    } else {
      setValidPhoneNumber(1);
    }

    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    if (/\S+@\S+\.\S+/.test(trimmedValue)) {
      setValidEmail(2);
    } else {
      setValidEmail(1);
    }

    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    // 비밀번호 입력 시, 영문/숫자/특수문자 중 2가지 이상 포함 여부 체크
    if (
      name === "password" &&
      /^(?:(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*\d)(?=.*[\W_]))/.test(trimmedValue)
    ) {
      setContainsTwoTypes(2);
    } else {
      setContainsTwoTypes(1);
    }

    // 비밀번호 입력 시, 8자 이상 20자 이하 여부 체크
    if (name === "password" && trimmedValue.length >= 8 && trimmedValue.length <= 20) {
      setMoreOrLess(2);
    } else {
      setMoreOrLess(1);
    }
    // 비밀번호 입력 시, 연속 3자 이상 동일한 문자/숫자 제외 여부 체크
    if (name === "password" && !/(.)\1{2,}/.test(trimmedValue)) {
      setConsecutiveChar(2);
    } else {
      setConsecutiveChar(1);
    }
    // 비밀번호 다 지우면 초기화
    if (name == "password" && trimmedValue.length === 0) {
      setContainsTwoTypes(0);
      setMoreOrLess(0);
      setConsecutiveChar(0);
    }
    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };
  const confirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    if (formData.password === trimmedValue) {
      // 비밀번호와 비밀번호 확인이 일치하는지 체크
      setValidConfirmPassword(2);
    } else {
      setValidConfirmPassword(1); // 비밀번호와 비밀번호 확인이 일치하지 않을 때
    }

    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
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
  const togglePasswordVisibility = () => {
    setIsViewHidden(() => !isViewHidden);
  };
  const getIconSrc = (isContainsTwoTypes: number) => {
    switch (isContainsTwoTypes) {
      case 0:
        return "/image/icon_check.svg";
      case 1:
        return "/image/icon_x_red.svg";
      default:
        return "/image/icon_check_green.svg";
    }
  };
  const getViewHiddenIconSrc = (isViewHidden: boolean) => {
    switch (isViewHidden) {
      case true:
        return "/image/icon_eye.svg";
      case false:
        return "/image/icon_eye_off.svg";
    }
  };
  return (
    <div className={cx("bg-gray", { "scroll-off": isTermsOfServiceModalOpen })}>
      <PublicHeader />
      <TermsOfServiceModal isOpen={isTermsOfServiceModalOpen} onClose={closeTermsOfServiceModal} />
      <ConsentInformationModal isOpen={isConsentInformationModalOpen} onClose={closeConsentInformationModal} />
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
            />
            {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
            <div className="input-wraper">
              <input
                className={cx({
                  mb16: true,
                  "border-red": isContainsTwoTypes === 1,
                  "input-text-red": isContainsTwoTypes === 1,
                  "border-green": isContainsTwoTypes === 2,
                  "input-text-green": isContainsTwoTypes === 2,
                })}
                type={isViewHidden ? "password" : "text"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
              />
              <div className="input-right-section">
                <button onClick={togglePasswordVisibility} type="button">
                  <img src={getViewHiddenIconSrc(isViewHidden)} alt="비밀번호 보기" />
                </button>
              </div>
            </div>

            <div className="password-guide-section">
              <div className="password-guide">
                <img src={getIconSrc(isContainsTwoTypes)} alt="체크" />
                <p
                  className={cx({
                    "text-green": isContainsTwoTypes === 2,
                    "text-red": isContainsTwoTypes === 1,
                  })}
                >
                  영문/숫자/특수문자 중, 2가지 이상 포함
                </p>
              </div>
              <div className="password-guide">
                <img src={getIconSrc(isMoreOrLess)} alt="체크" />
                <p
                  className={cx({
                    "text-green": isMoreOrLess === 2,
                    "text-red": isMoreOrLess === 1,
                  })}
                >
                  8자 이상 32자 이하 입력 (공백 제외)
                </p>
              </div>

              <div className="password-guide">
                <img src={getIconSrc(isConsecutiveChar)} alt="체크" />
                <p
                  className={cx({
                    "text-green": isConsecutiveChar === 2,
                    "text-red": isConsecutiveChar === 1,
                  })}
                >
                  연속 3자 이상 동일한 문자/숫자 제외
                </p>
              </div>
            </div>

            <input
              className="mb12"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 재확인"
            />

            <div className="s__checkbox-wrap">
              <div className="s__checkbox">
                <input type="checkbox" className="s__checkbox-total" id="ch01_all" />
                <label htmlFor="ch01_all">모두 동의합니다.</label>
              </div>
              <div className="s__checkbox">
                <input type="checkbox" className="s__checkbox-ck" id="ch01_01" />
                <label htmlFor="ch01_01">
                  [필수]
                  <button className="openPopup" onClick={openTermsOfServiceModal} type="button">
                    이용약관 동의
                  </button>
                </label>
              </div>
              <div className="s__checkbox mt12">
                <input type="checkbox" className="s__checkbox-ck" id="ch01_02" />
                <label htmlFor="ch01_02">
                  [필수]
                  <button className="openPopup" onClick={openConsentInformationModal} type="button">
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
