import PublicHeader from "../components/PublicHeader";
import EmailCheck from "./components/EmailCheck";
import SignupWrap from "./components/SignupWrap";
import { createContext, useState } from "react";
interface TrySignupContextType {
  trySignup: boolean;
  setTrySignup: (value: boolean) => void;
}
export const TrySignupContext = createContext<TrySignupContextType>({
  trySignup: false,
  setTrySignup: () => {},
});
const Signup = () => {
  const [trySignup, setTrySignup] = useState(false);
  return (
    <div className={"bg-gray"}>
      <TrySignupContext.Provider value={{ trySignup, setTrySignup }}>
        <PublicHeader />
        {trySignup ? <EmailCheck /> : <SignupWrap />}
      </TrySignupContext.Provider>
    </div>
  );
};
export default Signup;
