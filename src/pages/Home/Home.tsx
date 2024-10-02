import PublicHeader from "../components/PublicHeader";
import LoggedInHeader from "../components/LoggedInHeader";
import { useUserStore } from "@/store/user";
const Home = () => {
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  console.log(loggedInUserName);
  return (
    <>
      {loggedInUserName === "" ? <PublicHeader /> : <LoggedInHeader />}
      <h1>메인 페이지입니다</h1>
    </>
  );
};
export default Home;
