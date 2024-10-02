import styles from "./LoggedInHeader.module.css";
import { useUserStore } from "@/store/user";
import { Cookies } from "react-cookie";
import { Link, NavLink, useParams } from "react-router-dom";

const LoggedInHeader = () => {
  const params = useParams();
  const cookies = new Cookies();
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  const resetUser = useUserStore((state) => state.resetUser);
  const logout = () => {
    resetUser();
    cookies.remove("token");
  };
  const classroomId = params.classroomId;
  return (
    <header className={styles["bg-blue"]}>
      <div className={styles["header-menu"]}>
        <Link className={styles["header-logo"]} to="/">
          <img src="/image/img_logo.png" alt="로고" />
        </Link>
        {/* <!-- 활성화 할 a태그에 on_active 클래스 추가 --> */}
        <NavLink to="/group" className={({ isActive }) => (isActive ? styles["on_active"] : "")}>
          학생목록
        </NavLink>

        <NavLink to="/viz" className={({ isActive }) => (isActive ? styles["on_active"] : "")}>
          시각화
        </NavLink>

        <NavLink to="/assignment" className={({ isActive }) => (isActive ? styles["on_active"] : "")}>
          과제
        </NavLink>
        <NavLink
          to={`/group/classroom/manage/${classroomId}`}
          className={({ isActive }) => (isActive ? styles["on_active"] : "")}
        >
          설정
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
