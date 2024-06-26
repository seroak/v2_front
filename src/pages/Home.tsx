import styles from "./home.module.css";
import CodeEditor from "../component/CodeEditor";
import RightSection from "../component/RightSection";
import Resizable from "../component/Resizable";
import { createContext, useState, Dispatch, SetStateAction } from "react";

import { useMutation } from "@tanstack/react-query";
import { CodeItem } from "@/types/codeItem";

// 원본 코드 타입 정의
interface CodeContextType {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}
export const CodeContext = createContext<CodeContextType | undefined>(
  undefined
);
// 전처리한 코드 타입 정의
interface CodeDataContextType {
  codeData: CodeItem[];
  setCodeData: Dispatch<SetStateAction<CodeItem[]>>;
}
export const CodeDataContext = createContext<CodeDataContextType | undefined>(
  undefined
);
export default function Home() {
  // 원본 코드 state
  const [code, setCode] = useState<any>(
    ["def hello_world():", '    print("Hello, World!")'].join("\n")
  );
  // 전처리한 코드 state
  const [codeData, setCodeData] = useState<CodeItem[]>([]);
  const mutation = useMutation({
    mutationFn: async (code) => {
      const response = await fetch("http://localhost:8000/v1/python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 백엔드에 전송할 데이터는 객체로 source_code 키에 code를 할당하여 전송
        body: JSON.stringify({ source_code: code }),
      });
      return await response.json();
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // editorData를 사용하여 제출 로직 처리
    mutation.mutate(code, {
      onSuccess: (data) => {
        setCodeData(data);
        console.log("Success:", data); // 성공 시 콘솔에 출력
      },
      onError: (error) => {
        console.error("Submit Error:", error); // 제출 오류 시 콘솔에 출력
      },
    });
  };
  return (
    <CodeContext.Provider value={{ code, setCode }}>
      <CodeDataContext.Provider value={{ codeData, setCodeData }}>
        <main className={styles.main}>
          <div className={styles.header}>
            <form action="#" onSubmit={handleSubmit}>
              <button type="submit" className={styles.button}>
                {/* // 버튼에 기본 css가 적용되어 있다 border: none 하면 지워진다
              // 테두리디자인에 대한 고민 필요 */}
                <svg
                  width="65"
                  height="27"
                  viewBox="0 0 65 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27 13.5L6.75 25.1913L6.75 1.80866L27 13.5Z"
                    fill="#D9D9D9"
                  />
                  <path
                    d="M37.4091 19V7.36364H41.3409C42.25 7.36364 42.9962 7.51894 43.5795 7.82955C44.1629 8.13636 44.5947 8.55871 44.875 9.09659C45.1553 9.63447 45.2955 10.2462 45.2955 10.9318C45.2955 11.6174 45.1553 12.2254 44.875 12.7557C44.5947 13.286 44.1648 13.7027 43.5852 14.0057C43.0057 14.3049 42.2652 14.4545 41.3636 14.4545H38.1818V13.1818H41.3182C41.9394 13.1818 42.4394 13.0909 42.8182 12.9091C43.2008 12.7273 43.4773 12.4697 43.6477 12.1364C43.822 11.7992 43.9091 11.3977 43.9091 10.9318C43.9091 10.4659 43.822 10.0587 43.6477 9.71023C43.4735 9.36174 43.1951 9.0928 42.8125 8.90341C42.4299 8.71023 41.9242 8.61364 41.2955 8.61364H38.8182V19H37.4091ZM42.8864 13.7727L45.75 19H44.1136L41.2955 13.7727H42.8864ZM52.9616 15.4318V10.2727H54.3026V19H52.9616V17.5227H52.8707C52.6662 17.9659 52.348 18.3428 51.9162 18.6534C51.4844 18.9602 50.9389 19.1136 50.2798 19.1136C49.7344 19.1136 49.2495 18.9943 48.8253 18.7557C48.401 18.5133 48.0677 18.1496 47.8253 17.6648C47.5829 17.1761 47.4616 16.5606 47.4616 15.8182V10.2727H48.8026V15.7273C48.8026 16.3636 48.9806 16.8712 49.3366 17.25C49.6965 17.6288 50.1548 17.8182 50.7116 17.8182C51.045 17.8182 51.384 17.733 51.7287 17.5625C52.0772 17.392 52.3688 17.1307 52.6037 16.7784C52.8423 16.4261 52.9616 15.9773 52.9616 15.4318ZM58.0994 13.75V19H56.7585V10.2727H58.054V11.6364H58.1676C58.3722 11.1932 58.6828 10.8371 59.0994 10.5682C59.5161 10.2955 60.054 10.1591 60.7131 10.1591C61.304 10.1591 61.821 10.2803 62.2642 10.5227C62.7074 10.7614 63.0521 11.125 63.2983 11.6136C63.5445 12.0985 63.6676 12.7121 63.6676 13.4545V19H62.3267V13.5455C62.3267 12.8598 62.1487 12.3258 61.7926 11.9432C61.4366 11.5568 60.9479 11.3636 60.3267 11.3636C59.8987 11.3636 59.5161 11.4564 59.179 11.642C58.8456 11.8277 58.5824 12.0985 58.3892 12.4545C58.196 12.8106 58.0994 13.2424 58.0994 13.75Z"
                    fill="white"
                  />
                </svg>
              </button>
            </form>
          </div>
          <Resizable left={<CodeEditor />} right={<RightSection />} />
        </main>
      </CodeDataContext.Provider>
    </CodeContext.Provider>
  );
}
