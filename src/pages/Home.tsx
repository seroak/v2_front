import style from "./home.module.css";
import CodeEditor from "../component/CodeEditor";
import RightSection from "../component/RightSection";
import Resizable from "../component/Resizable";
import { createContext, useState, Dispatch, SetStateAction } from "react";

// context 타입 정의
interface CodeContextType {
  codeData: object;
  setCodeData: Dispatch<SetStateAction<object>>;
}
export const CodeContext = createContext<CodeContextType>({
  codeData: {},
  setCodeData: () => {},
});
export default function Home() {
  const [codeData, setCodeData] = useState({});
  return (
    <CodeContext.Provider value={{ codeData, setCodeData }}>
      <main className={style.main}>
        <h1>Haeya 에디터</h1>
        <Resizable left={<CodeEditor />} right={<RightSection />} />
      </main>
    </CodeContext.Provider>
  );
}
