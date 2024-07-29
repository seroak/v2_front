import styles from "./PublicHeader.module.css";

const PublicHeader = () => {
  return (
    <header className={styles["bg-blue"]}>
      <div className={styles["header-menu"]}>
        <a className={styles["header-logo"]} href="">
          <img src="/image/img_logo.png" alt="로고" />
        </a>
        {/* <!-- 활성화 할 a태그에 on_active 클래스 추가 --> */}
        <a href="#">시각화</a>
        <a href="#">가격</a>
      </div>
      <div>
        <a href="" className={styles["login-btn"]}>
          로그인
        </a>
        <a href="" className={styles["join-btn"]}>
          회원가입
        </a>
      </div>
    </header>
  );
};
export default PublicHeader;
