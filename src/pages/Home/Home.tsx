import PublicHeader from "../components/PublicHeader";
import LoggedInHeader from "../components/LoggedInHeader";
import { useUserStore } from "@/store/user";
const Home = () => {
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  return (
    <>
      {loggedInUserName === "" ? <PublicHeader /> : <LoggedInHeader />}
      <h1>메인페이지버전2 입니다</h1>
    </>
  );
};
export default Home;
