import styles from "./LoggedInHeader.module.css";
import { useUserStore } from "@/store/user";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
const LoggedInHeader = () => {
  const cookies = new Cookies();
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  const resetUser = useUserStore((state) => state.resetUser);
  const logout = () => {
    resetUser();
    cookies.remove("token");
  };
  return (
    <header className={styles["bg-blue"]}>
      <div className={styles["header-menu"]}>
        <Link className={styles["header-logo"]} to="/">
          <img src="/image/img_logo.png" alt="로고" />
        </Link>
        {/* <!-- 활성화 할 a태그에 on_active 클래스 추가 --> */}
        <a href="#">학생목록</a>
        <Link to="/viz" className={styles["on_active"]}>
          시각화
        </Link>
        <a href="#">과제</a>
        <a href="#">설정</a>
      </div>

      <div>
        {loggedInUserName === "" ? null : <a style={{ marginRight: "10px" }}>{loggedInUserName}님</a>}
        <a onClick={logout} className={styles["logout"]}>
          <a>로그아웃</a>
        </a>
      </div>
    </header>
  );
};
export default LoggedInHeader;
