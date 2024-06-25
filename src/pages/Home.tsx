import styles from "./home.module.css";
import CodeEditor from "../component/CodeEditor";
import RightSection from "../component/RightSection";
import Resizable from "../component/Resizable";
import { createContext, useState, Dispatch, SetStateAction } from "react";
import { create } from "lodash";
import { useMutation } from "@tanstack/react-query";

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
  code: DummyItem[];
  setCode: Dispatch<SetStateAction<DummyItem[]>>;
}
export const CodeContext = createContext<CodeContextType | undefined>(
  undefined
);

export default function Home() {
  const [code, setCode] = useState<string>(
    ["def hello_world():", '    print("Hello, World!")'].join("\n")
  );
  const mutation = useMutation({
    mutationFn: async (code) => {
      const response = await fetch("http://localhost:8000/v1/python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source_code: code }),
      });
      return await response.json();
      // return result;
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // editorData를 사용하여 제출 로직 처리
    mutation.mutate(code, {
      onSuccess: (data) => {
        setCode(data);
        console.log("Success:", data); // 성공 시 콘솔에 출력
      },
      onError: (error) => {
        console.error("Submit Error:", error); // 제출 오류 시 콘솔에 출력
      },
    });
  };
  return (
    <CodeContext.Provider value={{ code, setCode }}>
      <main className={styles.main}>
        <form action="#" onSubmit={handleSubmit}>
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
