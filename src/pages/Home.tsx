import styles from "./home.module.css";
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // editorData를 사용하여 제출 로직 처리
    console.log(codeData);
  };
  return (
    <CodeContext.Provider value={{ codeData, setCodeData }}>
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div className={styles.header}>
            <button type="submit" className={styles.button}>
              Run
            </button>
          </div>
          <Resizable left={<CodeEditor />} right={<RightSection />} />
        </form>
      </main>
    </CodeContext.Provider>
  );
}
