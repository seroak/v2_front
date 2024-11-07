import { useContext } from "react";
import { CodeContext } from "../../context/CodeContext";
import { Fragment } from "react/jsx-runtime";
import styles from "./LeftSection.module.css";
import CodeEditor from "./components/CodeEditor";
import Console from "./components/Console";
import Split from "react-split";
import { runCode } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import Dropdown from "./components/Dropdown";
import { useConsoleStore } from "@/store/console";
import { useEditorStore } from "@/store/editor";

// 성공 응답 타입 정의

const LeftSection = () => {
  const setErrorLine = useEditorStore((state) => state.setErrorLine);
  const setConsole = useConsoleStore((state) => state.setConsole);
  const codeContext = useContext(CodeContext);
  if (!codeContext) {
    throw new Error("CodeContext not found");
  }
  const { code } = codeContext;
  const mutation = useMutation({
    mutationFn: runCode,
    async onSuccess(data) {
      console.log(data.result.output);
      // 타입 체크 함수
      setConsole([data.result.output]);
    },
    onError(error) {
      console.error(error);
      if (error.message === "데이터 형식이 올바르지 않습니다") {
        return;
      } else if ((error as any).code === "CA-400006" || (error as any).code === "CA-400999") {
        alert("지원하지 않는 코드가 포함되어 있습니다");
        return;
      } else if ((error as any).code === "CA-400002") {
        // 잘못된 문법 에러처리
        const linNumber = Number((error as any).result.lineNumber);
        const errorMessage = (error as any).result.errorMessage;
        setErrorLine({ lineNumber: linNumber, message: errorMessage });
        setConsole([errorMessage]);
      }
      setConsole([]);
    },
  });
  const handleRunCode = () => {
    mutation.mutate(code);
  };
  return (
    <Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles["top-bar"]}>
          <p className={styles["view-section-title"]}>코드작성</p>
          <div className="flex items-center gap-4">
            <button type="button" className={styles["playcode-btn"]} onClick={handleRunCode}>
              <img src="/image/icon_play_w.svg" alt="" />
              코드실행
            </button>
            <Dropdown />
          </div>
        </div>

        <Split
          sizes={[70, 30]}
          minSize={100}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="vertical"
          cursor="row-resize"
          style={{ display: "flex", flexDirection: "column", height: "94.5%" }}
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
