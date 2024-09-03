import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import PublicHeader from "../components/PublicHeader";
import styles from "./Signup.module.css";
import axios from "axios";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, "");
    setFormData((prevData) => ({ ...prevData, [name]: trimmedValue }));
  };

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (!formData.username.trim()) newErrors.username = "사용자 이름은 필수입니다.";
    if (!formData.email.trim()) newErrors.email = "이메일은 필수입니다.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "유효한 이메일 주소를 입력하세요.";
    if (!formData.phoneNumber) newErrors.phoneNumber = "핸드폰 번호는 필수입니다.";
    else if (!/^010-\d{3,4}-\d{4}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "유효한 핸드폰 번호를 입력하세요.";
    if (!formData.password) newErrors.password = "비밀번호는 필수입니다.";
    else if (formData.password.length < 6 || formData.confirmPassword.length > 20)
      newErrors.password = "비밀번호는 최소 8자 이상 20자 이하여야 합니다.";
    else if (!/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/.test(formData.password))
      newErrors.password = "비밀번호는 최소 1개의 특수 문자를 포함해야 합니다";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

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
      return axios.post(
        "http://localhost:8083/signup",
        { req },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    },
    onSuccess() {
      alert("회원가입이 완료되었습니다.");
      // 랜딩 페이지로 접근하는 코드가 들어가야 할 곳
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
    <div className="bg-gray">
      <PublicHeader />
      <div className="login-wrap">
        <img className="mb20" src="/image/img_logo2.png" alt="로고" />
        <p className="mb40">
          이미 계정이 있으신가요?
          <a className="color-blue" href="">
            로그인
          </a>
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
                  <button className="openPopup js-popup-open" data-popid="popupModal01" type="button">
                    이용약관 동의
                  </button>
                </label>
              </div>
              <div className="s__checkbox mt12">
                <input type="checkbox" className="s__checkbox-ck" id="ch01_02" />
                <label htmlFor="ch01_02">
                  [필수]
                  <button className="openPopup js-popup-open" data-popid="popupModal02" type="button">
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

      <div id="popupModal01" className="popup__section">
        <div className="popup__dim"></div>
        <div className="popup__inner">
          <div className="popup__container__group --popup">
            <div className="popup__header__group">
              <h2 className="popup__header__title">이용약관 동의</h2>
              <button className="popup__header__close js-popup-close">
                <span className="screen-out">닫기</span>
              </button>
            </div>
            <div className="popup__contents__group js-popup-scroll ps">
              <p>
                제1조 (개인정보의 처리 목적)
                <br />
                1.(공통) 회사는 개인 정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
                받는 등 필요한 조치를 이행할 예정입니다.
                <br />
                - 서비스 회원 가입의사 확인, 회원 식별, 회원자격 유지 및 관리, 서비스 부정이용 방지
                <br />
                - 만 14세 미만 아동의 개인정보 수집·처리시 법정대리인의 동의여부 확인, 법정 대리인 권리행사 시 본인 확인
                <br />
                - 재화 또는 서비스 제공, 물품 배송, 청구서, 계약서 등의 전송 및 배송
                <br />
                - 요금 결제·정산, 본인인증, 환불 처리
                <br />
                - 고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출 용도
                <br />
                - 문의사항 또는 고충처리, 공지사항 기타 각종 통지
                <br />
                제1조 (개인정보의 처리 목적)
                <br />
                1.(공통) 회사는 개인 정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
                받는 등 필요한 조치를 이행할 예정입니다.
                <br />
                - 서비스 회원 가입의사 확인, 회원 식별, 회원자격 유지 및 관리, 서비스 부정이용 방지
                <br />
                - 만 14세 미만 아동의 개인정보 수집·처리시 법정대리인의 동의여부 확인, 법정 대리인 권리행사 시 본인 확인
                <br />
                - 재화 또는 서비스 제공, 물품 배송, 청구서, 계약서 등의 전송 및 배송
                <br />
                - 요금 결제·정산, 본인인증, 환불 처리
                <br />
                - 고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출 용도
                <br />
                - 문의사항 또는 고충처리, 공지사항 기타 각종 통지
                <br />
                제1조 (개인정보의 처리 목적)
                <br />
                1.(공통) 회사는 개인 정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
                받는 등 필요한 조치를 이행할 예정입니다.
                <br />
                - 서비스 회원 가입의사 확인, 회원 식별, 회원자격 유지 및 관리, 서비스 부정이용 방지
                <br />
                - 만 14세 미만 아동의 개인정보 수집·처리시 법정대리인의 동의여부 확인, 법정 대리인 권리행사 시 본인 확인
                <br />
                - 재화 또는 서비스 제공, 물품 배송, 청구서, 계약서 등의 전송 및 배송
                <br />
                - 요금 결제·정산, 본인인증, 환불 처리
                <br />
                - 고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출 용도
                <br />
                - 문의사항 또는 고충처리, 공지사항 기타 각종 통지
                <br />
                제1조 (개인정보의 처리 목적)
                <br />
                1.(공통) 회사는 개인 정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
                받는 등 필요한 조치를 이행할 예정입니다.
                <br />
                - 서비스 회원 가입의사 확인, 회원 식별, 회원자격 유지 및 관리, 서비스 부정이용 방지
                <br />
                - 만 14세 미만 아동의 개인정보 수집·처리시 법정대리인의 동의여부 확인, 법정 대리인 권리행사 시 본인 확인
                <br />
                - 재화 또는 서비스 제공, 물품 배송, 청구서, 계약서 등의 전송 및 배송
                <br />
                - 요금 결제·정산, 본인인증, 환불 처리
                <br />
                - 고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출 용도
                <br />
                - 문의사항 또는 고충처리, 공지사항 기타 각종 통지
                <br />
                제1조 (개인정보의 처리 목적)
                <br />
                1.(공통) 회사는 개인 정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
                받는 등 필요한 조치를 이행할 예정입니다.
                <br />
                - 서비스 회원 가입의사 확인, 회원 식별, 회원자격 유지 및 관리, 서비스 부정이용 방지
                <br />
                - 만 14세 미만 아동의 개인정보 수집·처리시 법정대리인의 동의여부 확인, 법정 대리인 권리행사 시 본인 확인
                <br />
                - 재화 또는 서비스 제공, 물품 배송, 청구서, 계약서 등의 전송 및 배송
                <br />
                - 요금 결제·정산, 본인인증, 환불 처리
                <br />
                - 고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출 용도
                <br />
                - 문의사항 또는 고충처리, 공지사항 기타 각종 통지
                <br />
                제1조 (개인정보의 처리 목적)
                <br />
                1.(공통) 회사는 개인 정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
                받는 등 필요한 조치를 이행할 예정입니다.
                <br />
                - 서비스 회원 가입의사 확인, 회원 식별, 회원자격 유지 및 관리, 서비스 부정이용 방지
                <br />
                - 만 14세 미만 아동의 개인정보 수집·처리시 법정대리인의 동의여부 확인, 법정 대리인 권리행사 시 본인 확인
                <br />
                - 재화 또는 서비스 제공, 물품 배송, 청구서, 계약서 등의 전송 및 배송
                <br />
                - 요금 결제·정산, 본인인증, 환불 처리
                <br />
                - 고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출 용도
                <br />
                - 문의사항 또는 고충처리, 공지사항 기타 각종 통지
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="popupModal02" className="popup__section">
        <div className="popup__dim"></div>
        <div className="popup__inner">
          <div className="popup__container__group --popup">
            <div className="popup__header__group">
              <h2 className="popup__header__title">개인정보 수집 및 이용에 관한 동의</h2>
              <button className="popup__header__close js-popup-close">
                <span className="screen-out">닫기</span>
              </button>
            </div>
            <div className="popup__contents__group js-popup-scroll ps">
              <p>
                제1조 (개인정보의 처리 목적)
                <br />
                1.(공통) 회사는 개인 정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
                용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
                받는 등 필요한 조치를 이행할 예정입니다.
                <br />
                - 서비스 회원 가입의사 확인, 회원 식별, 회원자격 유지 및 관리, 서비스 부정이용 방지
                <br />
                - 만 14세 미만 아동의 개인정보 수집·처리시 법정대리인의 동의여부 확인, 법정 대리인 권리행사 시 본인 확인
                <br />
                - 재화 또는 서비스 제공, 물품 배송, 청구서, 계약서 등의 전송 및 배송
                <br />
                - 요금 결제·정산, 본인인증, 환불 처리
                <br />
                - 고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출 용도
                <br />
                - 문의사항 또는 고충처리, 공지사항 기타 각종 통지
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
