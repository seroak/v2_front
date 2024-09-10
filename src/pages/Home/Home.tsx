import PublicHeader from "../components/PublicHeader";
import LoggedInHeader from "../components/LoggedInHeader";
import { useUserStore } from "@/store/user";
const Home = () => {
  const loggedInUserName = useUserStore((state) => state.loggedInUserName);
  return (
    <>
      {loggedInUserName === "" ? <PublicHeader /> : <LoggedInHeader />}
      <h1>푸쉬후 자동 배포 되나?</h1>
    </>
  );
};
export default Home;
