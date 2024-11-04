import { createContext, useState, Dispatch, SetStateAction } from "react";
import styles from "./Visualization.module.css";
import "./gutter.css";
import PublicHeader from "../components/PublicHeader";
import LoggedInHeader from "../components/LoggedInHeader";
import LeftSection from "./components/LeftSection/LeftSection";
import RightSection from "./components/RightSection/RightSection";
import GptComment from "./components/LeftSection/components/GptComment";
import GptIcon from "./components/LeftSection/components/GptIcon";

import Split from "react-split";
import { ValidTypeDto } from "@/pages/Visualization/types/dto/ValidTypeDto";
import { CodeContext } from "./context/CodeContext";
import { PreprocessedCodesContext } from "./context/PreProcessedCodesContext";
//zustand store
import { useEditorStore } from "@/store/editor";
import { useUserStore } from "@/store/user";
import { useGptTooltipStore } from "@/store/gptTooltip";

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
