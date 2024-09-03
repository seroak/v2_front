import { Link } from "react-router-dom";
import styles from "./PublicHeader.module.css";

const PublicHeader = () => {
  return (
    <header className={styles["bg-blue"]}>
      <div className={styles["header-menu"]}>
        <a className={styles["header-logo"]} href="">
          <img src="/image/img_logo.png" alt="로고" />
        </a>
        {/* <!-- 활성화 할 a태그에 on_active 클래스 추가 --> */}

        <Link to="/viz">시각화</Link>

        <a href="#">가격</a>
      </div>
      <div>
        <Link to="/login" className={styles["login-btn"]}>
          로그인
        </Link>
        <Link to="/signup" className={styles["join-btn"]}>
          회원가입
        </Link>
      </div>
    </header>
  );
};
export default PublicHeader;
