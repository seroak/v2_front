import { createContext, useState, Dispatch, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import styles from "./Home.module.css";
import LoggedInHeader from "../components/LoggedInHeader";
import PublicHeader from "../components/PublicHeader";
import LeftSection from "./components/LeftSection/LeftSection";
import RightSection from "./components/RightSection/RightSection";
import Resizable from "./components/Resizable";

import { ValidTypeDto, isValidTypeDtoArray } from "@/pages/Home/types/dto/ValidTypeDto";
// 원본 코드 타입 정의
interface CodeContextType {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}
// 전처리한 코드 타입 정의
interface PreprocessedCodeContextType {
  preprocessedCodes: ValidTypeDto[];
  setPreprocessedCodes: Dispatch<SetStateAction<ValidTypeDto[]>>;
}
// Create contexts
export const CodeContext = createContext<CodeContextType>({
  code: "",
  setCode: () => {},
});

export const PreprocessedCodesContext = createContext<PreprocessedCodeContextType>({
  preprocessedCodes: [],
  setPreprocessedCodes: () => {},
});

export default function Home() {
  // 원본 코드 state
  const [code, setCode] = useState<any>(["def hello_world():", '    print("Hello, World!")'].join("\n"));
  // 전처리한 코드 state
  const [preprocessedCodes, setPreprocessedCodes] = useState<ValidTypeDto[]>([]);

  const mutation = useMutation({
    mutationFn: async (code: string) => {
      return fetch("http://localhost:8000/v1/python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source_code: code }),
      });
    },
    async onSuccess(data) {
      try {
        const jsonData = await data.json();
        // 타입 체크 함수
        if (isValidTypeDtoArray(jsonData)) {
          setPreprocessedCodes(jsonData);
        } else {
          throw new Error("받은 데이터가 올바르지 않습니다");
        }
      } catch (error) {
        console.error("Data processing error:", error);
        alert("받은 데이터의 형식이 올바르지 않습니다.");
      }
    },
    onError(error) {
      console.error("Submit Error:", error);
      alert("코드 처리 중 에러가 발생했습니다.");
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(code);
  };

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      <PreprocessedCodesContext.Provider value={{ preprocessedCodes, setPreprocessedCodes }}>
        <LoggedInHeader />

        <main className={styles.main}>
          <div className={styles["top-btns"]}>
            <div>
              <button type="button" className={styles["playcode-btn"]}>
                <img src="/image/icon_play_w.svg" alt="" />
                실행코드
              </button>
            </div>
            <div>
              <button type="button" className={styles["view-btn"]}>
                <img src="/image/icon_play_w.svg" alt="" />
                시각화
              </button>
              <div>
                <button>
                  <img src="/image/icon_play_back.svg" alt="뒤로" />
                </button>
                <button className="ml8">
                  <img src="/image/icon_play_stop.svg" alt="일시정지" />
                </button>
                <button className="ml8">
                  <img src="/image/icon_play_next.svg" alt="다음" />
                </button>
                <p className={styles["ml14 fz14"]}>(23/23)</p>
                <p className={styles["ml24 fz14"]}>Play Speed</p>
                <select name="" id="" className={styles["s__select ml14"]}>
                  <option value="1x">1X</option>
                  <option value="2x">2X</option>
                </select>
              </div>
            </div>
          </div>
          {/* <div className={styles.header}>
            <form action="#" onSubmit={handleSubmit}>
              <button type="submit" className={styles.button} data-testid="submit-button">
    
                <svg width="56" height="22" viewBox="0 0 56 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10.4545L5 19.5084L5 1.40064L20 10.4545Z" fill="#D9D9D9" />
                  <path
                    d="M28.4091 17V5.36364H32.3409C33.25 5.36364 33.9962 5.51894 34.5795 5.82955C35.1629 6.13636 35.5947 6.55871 35.875 7.09659C36.1553 7.63447 36.2955 8.24621 36.2955 8.93182C36.2955 9.61742 36.1553 10.2254 35.875 10.7557C35.5947 11.286 35.1648 11.7027 34.5852 12.0057C34.0057 12.3049 33.2652 12.4545 32.3636 12.4545H29.1818V11.1818H32.3182C32.9394 11.1818 33.4394 11.0909 33.8182 10.9091C34.2008 10.7273 34.4773 10.4697 34.6477 10.1364C34.822 9.79924 34.9091 9.39773 34.9091 8.93182C34.9091 8.46591 34.822 8.05871 34.6477 7.71023C34.4735 7.36174 34.1951 7.0928 33.8125 6.90341C33.4299 6.71023 32.9242 6.61364 32.2955 6.61364H29.8182V17H28.4091ZM33.8864 11.7727L36.75 17H35.1136L32.2955 11.7727H33.8864ZM43.9616 13.4318V8.27273H45.3026V17H43.9616V15.5227H43.8707C43.6662 15.9659 43.348 16.3428 42.9162 16.6534C42.4844 16.9602 41.9389 17.1136 41.2798 17.1136C40.7344 17.1136 40.2495 16.9943 39.8253 16.7557C39.401 16.5133 39.0677 16.1496 38.8253 15.6648C38.5829 15.1761 38.4616 14.5606 38.4616 13.8182V8.27273H39.8026V13.7273C39.8026 14.3636 39.9806 14.8712 40.3366 15.25C40.6965 15.6288 41.1548 15.8182 41.7116 15.8182C42.045 15.8182 42.384 15.733 42.7287 15.5625C43.0772 15.392 43.3688 15.1307 43.6037 14.7784C43.8423 14.4261 43.9616 13.9773 43.9616 13.4318ZM49.0994 11.75V17H47.7585V8.27273H49.054V9.63636H49.1676C49.3722 9.19318 49.6828 8.83712 50.0994 8.56818C50.5161 8.29545 51.054 8.15909 51.7131 8.15909C52.304 8.15909 52.821 8.2803 53.2642 8.52273C53.7074 8.76136 54.0521 9.125 54.2983 9.61364C54.5445 10.0985 54.6676 10.7121 54.6676 11.4545V17H53.3267V11.5455C53.3267 10.8598 53.1487 10.3258 52.7926 9.94318C52.4366 9.55682 51.9479 9.36364 51.3267 9.36364C50.8987 9.36364 50.5161 9.45644 50.179 9.64205C49.8456 9.82765 49.5824 10.0985 49.3892 10.4545C49.196 10.8106 49.0994 11.2424 49.0994 11.75Z"
                    fill="white"
                  />
                </svg>
              </button>
            </form>
          </div> */}
          <Resizable left={<LeftSection />} right={<RightSection />} />
        </main>
      </PreprocessedCodesContext.Provider>
    </CodeContext.Provider>
  );
}
