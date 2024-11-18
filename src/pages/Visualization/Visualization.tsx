import { useState } from "react";
import styles from "./Visualization.module.css";
import "./gutter.css";

import Header from "../components/Header";
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
import { useGptTooltipStore } from "@/store/gptTooltip";
import { Link } from "react-router-dom";

export default function Visualization() {
  const [code, setCode] = useState<any>(
    [
      "# example\n" +
        "for i in range(2, 10):\n" +
        "   for j in range(1, 10):\n" +
        '      print(f"{i} x {j} = {i * j}")\n' +
        "   print()\n",
    ].join("\n")
  );
  const [preprocessedCodes, setPreprocessedCodes] = useState<ValidTypeDto[]>([]);
  // zustand store

  const { focus } = useEditorStore();
  const isGptToggle = useGptTooltipStore((state) => state.isGptToggle);
  const gptPin = useGptTooltipStore((state) => state.gptPin);

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      <PreprocessedCodesContext.Provider value={{ preprocessedCodes, setPreprocessedCodes }}>
        <div style={{ overflow: "hidden", height: "100%" }}>
          <Header />
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
              style={{ display: "flex", width: "100%", height: "100%" }}
            >
              <LeftSection />
              <RightSection />
            </Split>
            <div className="floating-buttons">
              <Link
                className="btn btn-manual"
                to="https://yielding-radio-61a.notion.site/edupi-13d86552b15980e4b359f38854d2b094?pvs=4"
                target="_blank"
              >
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 4h18v16H3z'%3E%3C/path%3E%3Cpath d='M8 4v16M16 4v16'%3E%3C/path%3E%3C/svg%3E"
                  alt="완료 아이콘"
                />
                사용법
              </Link>
            </div>
          </main>
        </div>
      </PreprocessedCodesContext.Provider>
    </CodeContext.Provider>
  );
}
