import { useContext } from "react";
import { CodeContext } from "../../context/CodeContext";
import { Fragment } from "react/jsx-runtime";
import styles from "./LeftSection.module.css";
import CodeEditor from "./components/CodeEditor";
import Console from "./components/Console";
import Split from "react-split";
import Dropdown from "./components/Dropdown";


import { PreprocessedCodesContext } from "../../context/PreProcessedCodesContext";

// 성공 응답 타입 정의

const LeftSection = () => {
  const preprocessedCodesContext = useContext(PreprocessedCodesContext); // context API로 데이터 가져오기

  if (!preprocessedCodesContext) {
    throw new Error("preprocessedCodesContext not found"); //context가 없을 경우 에러 출력 패턴 처리안해주면 에러 발생
  }
  const codeContext = useContext(CodeContext);

  if (!codeContext) {
    throw new Error("CodeContext not found");
  }

  return (
    <Fragment>

      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div className={styles["top-bar"]}>
          <p className={styles["view-section-title"]}>코드 작성</p>
          <div className="flex items-center gap-4">
            <Dropdown />
          </div>
        </div>

        <Split
          sizes={[60, 40]}
          gutterSize={30}
          gutterAlign="center"
          dragInterval={1}
          direction="vertical"
          cursor="row-resize"
          style={{ display: "flex", flexDirection: "column", height: "94%", flex: 1, overflow: "hidden" }}
          className={styles.splitContainer}

        >
          <CodeEditor />
          <Console />
        </Split>
      </div>
    </Fragment>
  );
};

export default LeftSection;
