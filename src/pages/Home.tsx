import style from "./home.module.css";
import CodeEditor from "../component/CodeEditor";
import RightSection from "../component/RightSection";
import Resizable from "../component/Resizable";
import { createContext, useState, Dispatch, SetStateAction } from "react";

interface DummyItem {
  id?: number;
  type: string;
  depth?: number;
  value?: number;
  name?: string;
  start?: number;
  end?: number;
  cur?: number;
  expr?: string;
  highlight?: number[] | string[];
  condition?: ConditionItem;
  variables?: VariableList[];
}
interface VarItem extends DummyItem {
  lightOn?: boolean;
}
interface VariableList {
  name: string;
  expr: string;
  depth: number;
  type?: string;
}
interface ConditionItem {
  target: string;
  start: number;
  end: number;
  cur: number;
  step: number;
}
// context 타입 정의
interface CodeContextType {
  codeData: DummyItem[];
  setCodeData: Dispatch<SetStateAction<DummyItem[]>>;
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
