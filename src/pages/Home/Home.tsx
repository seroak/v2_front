import PublicHeader from "../components/PublicHeader";
import LoggedInHeader from "../components/LoggedInHeader";
import { useUserStore } from "@/store/user";
const Home = () => {
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  return (
    <>
      {loggedInUserName === "" ? <PublicHeader /> : <LoggedInHeader />}
      <h1>깃허브 엑션 ci/cd 됐냐? s3퍼블릭으로 변경</h1>
    </>
  );
};
export default Home;
