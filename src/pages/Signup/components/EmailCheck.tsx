import cx from "classnames";
const EmailChek = () => {
  return (
    <div className="check-message">
      <div className="check-mesaage-wrapper">
        <h2 className={cx("check-message-top", "mb25")}> 인증 메일을 보내드렸어요</h2>
        <div className="check-img-center">
          <img
            className="mb20"
            style={{ width: 150, height: "auto" }} // width만 고정
            src="/image/img_logo2.png"
            alt="로고"
          />
        </div>

        <p className={cx("check-message-root", "mb35")}>
          메일함을 확인해 주세요.
          <br />
          가입하신 이메일을 인증해 주시면,
          <br />
          에듀파이의 서비스를 마음껏 이용하실 수 있어요.
        </p>
        <a className="check-Button" type="button" data-button="true" href="login">
          <div className="check-Button-inner">
            <span className="check-Button-label">로그인 페이지로 가기</span>
          </div>
        </a>
      </div>
    </div>
  );
};
export default EmailChek;
