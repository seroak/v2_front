import { Link } from "react-router-dom";
import styles from "./LoggedInHeader.module.css";

const LoggedInHeader = () => {
  return (
    <header className={styles["bg-blue"]}>
      <div className={styles["header-menu"]}>
        <a className={styles["header-logo"]} href="">
          <img src="/image/img_logo.png" alt="로고" />
        </a>
        {/* <!-- 활성화 할 a태그에 on_active 클래스 추가 --> */}
        <a href="#">학생목록</a>
        <a href="#" className={styles["on_active"]}>
          시각화
        </a>
        <a href="#">과제</a>
        <a href="#">설정</a>
      </div>
      <div>
        <Link to="" className={styles["logout"]}>
          <a>로그아웃</a>
        </Link>
      </div>
    </header>
  );
};
export default LoggedInHeader;
