import styles from "./LoggedInHeader.module.css";
import { useUserStore } from "@/store/user";

import { Link, NavLink } from "react-router-dom";
const LoggedInHeader = () => {
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  const resetUser = useUserStore((state) => state.resetUser);
  const fetchLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/edupi-user/v1/account/logout", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      resetUser();
      return;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };
  const logout = () => {
    fetchLogout();
  };
  return (
    <header className={styles["bg-blue"]}>
      <div className={styles["header-menu"]}>
        <Link className={styles["header-logo"]} to="/">
          <img src="/image/img_logo.png" alt="로고" />
        </Link>
        {/* <!-- 활성화 할 a태그에 on_active 클래스 추가 --> */}
        <NavLink to="/classroomspace" className={({ isActive }) => (isActive ? styles["on_active"] : "")}>
          클래스룸
        </NavLink>

        <NavLink to="/viz" className={({ isActive }) => (isActive ? styles["on_active"] : "")}>
          시각화
        </NavLink>
      </div>

      <div>
        {loggedInUserName === "" ? null : <span style={{ marginRight: "10px" }}>{loggedInUserName}님</span>}
        <span onClick={logout} className={styles["logout"]}>
          <span>로그아웃</span>
        </span>
      </div>
    </header>
  );
};
export default LoggedInHeader;
