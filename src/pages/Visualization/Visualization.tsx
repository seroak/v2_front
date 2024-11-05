import { createContext, useState, Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react";

import { useMutation } from "@tanstack/react-query";
import styles from "./Visualization.module.css";
import "./gutter.css";
import PublicHeader from "../components/PublicHeader";
import LoggedInHeader from "../components/LoggedInHeader";
import LeftSection from "./components/LeftSection/LeftSection";
import RightSection from "./components/RightSection/RightSection";
import GptComment from "./components/LeftSection/components/GptComment";
import GptIcon from "./components/LeftSection/components/GptIcon";
import { visualize } from "@/services/api";
import Split from "react-split";
import { ValidTypeDto, isValidTypeDtoArray } from "@/pages/Visualization/types/dto/ValidTypeDto";

//zustand store
import { useConsoleStore, useCodeFlowLengthStore } from "@/store/console";
import { useEditorStore } from "@/store/editor";
import { useArrowStore } from "@/store/arrow";
import { useUserStore } from "@/store/user";
import { useGptTooltipStore } from "@/store/gptTooltip";
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

export default function Visualization() {
  const [code, setCode] = useState<any>(
    ["a = 3", "for i in range(a):", "   print(' ' * ((a - 1) - i), end = '')", "   print('*' * (2 * i + 1))"].join("\n")
  );
  const [preprocessedCodes, setPreprocessedCodes] = useState<ValidTypeDto[]>([]);
  // zustand store

  const userName = useUserStore((state) => state.userName);

  const { focus } = useEditorStore();
  const isGptToggle = useGptTooltipStore((state) => state.isGptToggle);
  const gptPin = useGptTooltipStore((state) => state.gptPin);

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      <PreprocessedCodesContext.Provider value={{ preprocessedCodes, setPreprocessedCodes }}>
        {userName === "" ? <PublicHeader /> : <LoggedInHeader />}

        <main className={styles.main}>
          {focus && gptPin ? <GptIcon /> : (gptPin || isGptToggle) && <GptComment />}

          <Split
            sizes={[30, 70]}
            minSize={100}
            expandToMin={false}
            gutterSize={10}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            style={{ display: "flex", width: "99vw", height: "89.2vh" }}
          >
            <LeftSection />
            <RightSection />
          </Split>
        </main>
      </PreprocessedCodesContext.Provider>
    </CodeContext.Provider>
  );
}
