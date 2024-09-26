import { useState, useRef, ChangeEvent, FormEvent, useContext } from "react";
import ConsentInformationModal from "./ConsentInformationModal";
import TermsOfServiceModal from "./TermsOfServiceModal";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TrySignupContext } from "../Signup";
import cx from "classnames";
import axios from "axios";
interface FormData {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
// 회원가입 체크 3가지 상태 정의
enum CheckType {
  Gray = "gray",
  Red = "red",
  Green = "green",
}

const SignupWrap = () => {
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
  const [containsTwoTypes, setContainsTwoTypes] = useState<CheckType>(CheckType.Gray); //영문/숫자/특수문자 중, 2가지 이상 포함
  const [moreOrLess, setMoreOrLess] = useState<CheckType>(CheckType.Gray); //8자 이상 32자 이하 입력 (공백 제외)
  const [consecutiveChar, setConsecutiveChar] = useState<CheckType>(CheckType.Gray); //연속 3자 이상 동일한 문자/숫자 제외
  const [isViewHidden, setIsViewHidden] = useState<boolean>(true);
  const [isViewHiddenConfirm, setIsViewHiddenConfirm] = useState<boolean>(true);
  const [isValidEmail, setValidEmail] = useState<CheckType>(CheckType.Gray); // 이메일이 유효한지 체크하는 state
  const [isValidPhoneNumber, setValidPhoneNumber] = useState<CheckType>(CheckType.Gray); // 전화번호가 유효한지 체크하는 state
  const [isValidConfirmPassword, setValidConfirmPassword] = useState<CheckType>(CheckType.Gray); // 비밀번호가 일치하는지 체크하는 state
  const [isTermsOfServiceModalOpen, setIsTermsOfServiceModalOpen] = useState<boolean>(false);
  const context = useContext(TrySignupContext);
  if (!context) {
    throw new Error("TrySignupContext must be used within a TrySignupProvider");
  }

  const { setTrySignup } = context;
  const openTermsOfServiceModal = (): void => setIsTermsOfServiceModalOpen(true);
  const closeTermsOfServiceModal = (): void => setIsTermsOfServiceModalOpen(false);

  const [isConsentInformationModalOpen, setIsConsentInformationModalOpen] = useState<boolean>(false);
  const openConsentInformationModal = (): void => setIsConsentInformationModalOpen(true);
  const closeConsentInformationModal = (): void => setIsConsentInformationModalOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");

    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };

  const phoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 숫자만 추출
    const numbersOnly = value.replace(/[^\d]/g, "");

    // 숫자에 하이픈 추가
    let formattedNumber = "";
    if (numbersOnly.length <= 3) {
      formattedNumber = numbersOnly;
    } else if (numbersOnly.length <= 7) {
      formattedNumber = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    } else {
      formattedNumber = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
    }

    // 유효성 검사
    if (/^010-\d{3,4}-\d{4}$/.test(formattedNumber)) {
      setValidPhoneNumber(CheckType.Green);
    } else {
      setValidPhoneNumber(CheckType.Red);
    }

    // 상태 업데이트
    setFormData((prevData) => ({ ...prevData, [name]: formattedNumber }));
  };

  const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    if (/\S+@\S+\.\S+/.test(trimmedValue)) {
      setValidEmail(CheckType.Green);
    } else {
      setValidEmail(CheckType.Red);
    }

    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };
  const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    // 비밀번호 입력 시, 영문/숫자/특수문자 중 2가지 이상 포함 여부 체크
    if (
      name === "password" &&
      /^(?:(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*\d)(?=.*[\W_]))/.test(trimmedValue)
    ) {
      setContainsTwoTypes(CheckType.Green);
    } else {
      setContainsTwoTypes(CheckType.Red);
    }

    // 비밀번호 입력 시, 8자 이상 20자 이하 여부 체크
    if (name === "password" && trimmedValue.length >= 8 && trimmedValue.length <= 20) {
      setMoreOrLess(CheckType.Green);
    } else {
      setMoreOrLess(CheckType.Red);
    }
    // 비밀번호 입력 시, 연속 3자 이상 동일한 문자/숫자 제외 여부 체크
    if (name === "password" && !/(.)\1{2,}/.test(trimmedValue)) {
      setConsecutiveChar(CheckType.Green);
    } else {
      setConsecutiveChar(CheckType.Red);
    }
    // 비밀번호 다 지우면 초기화
    if (name == "password" && trimmedValue.length === 0) {
      setContainsTwoTypes(CheckType.Gray);
      setMoreOrLess(CheckType.Gray);
      setConsecutiveChar(CheckType.Gray);
    }
    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };
  const confirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    if (formData.password === trimmedValue) {
      // 비밀번호와 비밀번호 확인이 일치하는지 체크
      setValidConfirmPassword(CheckType.Green);
    } else {
      setValidConfirmPassword(CheckType.Red); // 비밀번호와 비밀번호 확인이 일치하지 않을 때
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
      return axios.post("http://localhost:8080/edupi-user/v1/account/signup", req, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
    },
    onSuccess() {
      setTrySignup(true);
    },
    onError(error) {
      console.error("회원가입 에러", error);
      alert("회원가입 중 오류가 발생했습니다.");
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidEmail === "red" || isValidEmail === "gray") {
      emailRef.current?.focus();
      setValidEmail(CheckType.Red);
      return;
    }
    if (isValidPhoneNumber === "red" || isValidPhoneNumber === "gray") {
      phoneNumberRef.current?.focus();
      setValidPhoneNumber(CheckType.Red);
      return;
    }
    if (containsTwoTypes === "red" || containsTwoTypes === "gray") {
      passwordRef.current?.focus();
      setContainsTwoTypes(CheckType.Red);
      return;
    }
    if (isValidConfirmPassword === "red" || isValidConfirmPassword === "gray") {
      confirmPasswordRef.current?.focus();
      setValidConfirmPassword(CheckType.Red);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      confirmPasswordRef.current?.focus();
      setValidConfirmPassword(CheckType.Red);
      return;
    }
    if (
      isValidEmail === "green" &&
      isValidPhoneNumber === "green" &&
      isValidConfirmPassword &&
      containsTwoTypes === "green"
    ) {
      mutation.mutate(formData);
      return;
    }
  };
  const togglePasswordVisibility = () => {
    setIsViewHidden(() => !isViewHidden);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsViewHiddenConfirm(() => !isViewHiddenConfirm);
  };
  const getIconSrc = (flag: string) => {
    console.log(flag);
    switch (flag) {
      case "gray":
        return "/image/icon_check.svg";
      case "red":
        return "/image/icon_x_red.svg";
      case "green":
        return "/image/icon_check_green.svg";
      default:
        null;
    }
  };
  const getViewHiddenIconSrc = (isViewHidden: boolean) => {
    if (isViewHidden) {
      return "/image/icon_eye.svg";
    }
    return "/image/icon_eye_off.svg";
  };
  return (
    <>
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
            <input
              className="mb16"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="이름"
            />

            <input
              className={cx({
                mb16: true,
                "border-red": isValidEmail === "red",
                "input-text-red": isValidEmail === "red",
              })}
              type="text"
              ref={emailRef}
              id="email"
              name="email"
              value={formData.email}
              onChange={emailChange}
              placeholder="이메일"
            />
            {isValidEmail == "red" && (
              <div className="guide-section">
                <div className="guide">
                  <img src="image/icon_x_red.svg" alt="체크" />
                  <p className="text-red">이메일 형식이 올바르지 않습니다</p>
                </div>
              </div>
            )}

            <input
              className={cx({
                mb16: true,
                "border-red": isValidPhoneNumber === "red",
                "input-text-red": isValidPhoneNumber === "red",
              })}
              ref={phoneNumberRef}
              type="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="휴대전화 번호"
              value={formData.phoneNumber}
              onChange={phoneNumberChange}
            />
            {isValidPhoneNumber == "red" && (
              <div className="guide-section">
                <div className="guide">
                  <img src="image/icon_x_red.svg" alt="체크" />
                  <p className="text-red">핸드폰 형식이 올바르지 않습니다</p>
                </div>
              </div>
            )}

            <div className="input-wraper">
              <input
                className={cx({
                  mb5: true,
                  "border-red": containsTwoTypes === "red",
                  "input-text-red": containsTwoTypes === "red",
                  "border-green": containsTwoTypes === "green",
                  "input-text-green": containsTwoTypes === "green",
                })}
                type={isViewHidden ? "password" : "text"}
                ref={passwordRef}
                id="password"
                name="password"
                value={formData.password}
                onChange={passwordChange}
                placeholder="비밀번호"
              />
              <div className="input-right-section">
                <button onClick={togglePasswordVisibility} type="button">
                  <img src={getViewHiddenIconSrc(isViewHidden)} alt="비밀번호 보기" />
                </button>
              </div>
            </div>
            <div className="guide-section">
              <div className="guide">
                <img src={getIconSrc(containsTwoTypes)} alt="체크" />
                <p
                  className={cx({
                    "text-green": containsTwoTypes === "green",
                    "text-red": containsTwoTypes === "red",
                  })}
                >
                  영문/숫자/특수문자 중, 2가지 이상 포함
                </p>
              </div>
              <div className="guide">
                <img src={getIconSrc(moreOrLess)} alt="체크" />
                <p
                  className={cx({
                    "text-green": moreOrLess === "green",
                    "text-red": moreOrLess === "red",
                  })}
                >
                  8자 이상 32자 이하 입력 (공백 제외)
                </p>
              </div>

              <div className="guide">
                <img src={getIconSrc(consecutiveChar)} alt="체크" />
                <p
                  className={cx({
                    "text-green": consecutiveChar === "green",
                    "text-red": consecutiveChar === "red",
                  })}
                >
                  연속 3자 이상 동일한 문자/숫자 제외
                </p>
              </div>
            </div>
            <div className="input-wraper">
              <input
                className={cx({
                  mb5: true,
                  "border-red": isValidConfirmPassword == "red",
                  "input-text-red": isValidConfirmPassword == "red",
                })}
                id="confirmPassword"
                ref={confirmPasswordRef}
                type={isViewHiddenConfirm ? "password" : "text"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={confirmPasswordChange}
                placeholder="비밀번호 재확인"
              />
              <div className="input-right-section">
                <button onClick={toggleConfirmPasswordVisibility} type="button">
                  <img src={getViewHiddenIconSrc(isViewHiddenConfirm)} alt="비밀번호 보기" />
                </button>
              </div>
            </div>

            {isValidConfirmPassword == "red" && (
              <div className="guide-section">
                <div className="guide">
                  <img src="image/icon_x_red.svg" alt="체크" />
                  <p className="text-red">비밀번호가 일치하지 않습니다</p>
                </div>
              </div>
            )}
            <div className="s__checkbox-wrap mt10">
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
    </>
  );
};
export default SignupWrap;
