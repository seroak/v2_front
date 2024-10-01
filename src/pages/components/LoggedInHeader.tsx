import styles from "./LoggedInHeader.module.css";
import { useUserStore } from "@/store/user";
import { useCookies } from "react-cookie";
import { Link, NavLink } from "react-router-dom";
const LoggedInHeader = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"], {
    doNotParse: true,
  });
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  const resetUser = useUserStore((state) => state.resetUser);
  const logout = () => {
    resetUser();
    removeCookie("token", { path: "/" });
  };
  return (
    <header className={styles["bg-blue"]}>
      <div className={styles["header-menu"]}>
        <Link className={styles["header-logo"]} to="/">
          <img src="/image/img_logo.png" alt="로고" />
        </Link>
        {/* <!-- 활성화 할 a태그에 on_active 클래스 추가 --> */}
        <NavLink to="/classroomspace" className={({ isActive }) => (isActive ? styles["on_active"] : "")}>
          클래스룸 스페이스
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
