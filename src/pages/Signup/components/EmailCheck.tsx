import cx from "classnames";
import "./EmailCheck.css";
const EmailChek = () => {
  return (
    <div className="check-message">
      <div className="check-message-wrapper">
        <div className="check-img-center">
          <img className="mb-20" src="/image/img_logo2.png" alt="로고" />
        </div>
        <h2 className={cx("check-message-top", "mb-25")}>인증 메일을 보내드렸어요</h2>
        <p className={cx("check-message-root", "mb-35")}>
          메일함을 확인해 주세요.
          <br />
          가입하신 이메일을 인증해 주시면,
          <br />
          에듀파이의 서비스를 마음껏 이용하실 수 있어요.
        </p>

        <a className="check-button" href="/login">
          <div className="check-button-inner">
            <span className="check-button-label">에듀파이 이용하러 가기</span>
          </div>
        </a>
      </div>
    </div>
  );
};
export default EmailChek;
