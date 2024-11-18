import { useMutation } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { CodeContext } from "@/pages/Visualization/context/CodeContext";
import { useTimeoutStore } from "@/store/timeout";
import { useGptTooltipStore } from "@/store/gptTooltip";
import { useEditorStore } from "@/store/editor";
import { useGptMutationStore } from "@/store/gptMutation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useResetEditor } from "@/store/resetEditor";
import { fetchGptCorrect, fetchGptHint } from "@/services/api";
import { useCustomAlert } from "@/pages/components/CustomAlert";
interface ModifiedCode {
  line: number;
  code: string;
}

interface ErrorType {
  code: string;
  detail: string;
  result: {};
}

const GptComment = () => {
  const context = useContext(CodeContext);
  const { setTimeoutId, clearCurrentTimeout } = useTimeoutStore();
  const { setIsGptToggle, gptPin, setGptPin, gptLeft, gptTop } = useGptTooltipStore();
  const { resetEditor, errorLine } = useEditorStore();
  const { resetTrigger, setResetTrigger } = useResetEditor();
  const { openAlert, CustomAlert } = useCustomAlert();
  const {
    isGptCorrectSuccess,
    isGptHintSuccess,
    reason,
    hint,
    modifiedCode,
    setGptCorrectSuccess,
    setGptHintSuccess,
    setReason,
    setHint,
    setHintLine,
    setModifiedCode,
    resetState,
  } = useGptMutationStore();

  const timeoutRef = useRef<number | null>(null);

  if (!context) {
    console.error("CodeContext not found");
    return null;
  }

  const { code, setCode } = context;
  // 간단한 구문 강조 함수

  const handleMouseOver = () => {
    clearCurrentTimeout();
    setIsGptToggle(true);
  };

  const handleMouseLeave = () => {
    clearCurrentTimeout();

    if (!gptPin) {
      timeoutRef.current = setTimeout(() => {
        setIsGptToggle(false);
        setTimeoutId(null);
      }, 300);
      setTimeoutId(timeoutRef.current);
    }
  };

  const gptCorrectMutation = useMutation({
    mutationFn: () => fetchGptCorrect(code, errorLine?.lineNumber || 1),
    async onSuccess(data) {
      console.log(data);
      setReason(data.result.reason);
      const newModifiedCode = data.result.modified_codes.reduce((acc: ModifiedCode[], cur: ModifiedCode) => {
        if (acc.length === 0) {
          acc.push(cur);
          return acc;
        }
        if (acc[acc.length - 1].line - cur.line !== -1) {
          acc.push({ line: 0, code: "" });
          acc.push(cur);
          return acc;
        }
        acc.push(cur);
        return acc;
      }, []);

      setModifiedCode(newModifiedCode);
      setGptCorrectSuccess(true);
    },
    onError(error) {
      const correctError = error as unknown as ErrorType;
      if (correctError.code === "CA-504001" || correctError.code === "CA-400999") {
        openAlert("잠시 후 다시 시도해주세요.");
      }
    },
  });

  const gptHintMutation = useMutation({
    mutationFn: () => fetchGptHint(code, errorLine?.lineNumber || 1),
    onSuccess(data) {
      setHint(data.result.hint);
      setHintLine(String(data.result.line));
      setGptHintSuccess(true);
    },
    onError(error) {
      console.error("An error occurred:", error);
      const hintError = error as unknown as ErrorType;
      if (hintError.code === "CA-504001" || hintError.code === "CA-400999") {
        openAlert("잠시 후 다시 시도해주세요.");
      }
    },
  });

  const handleApprove = () => {
    const newCode = code
      .split("\n")
      .map((line, index) => {
        const modifiedLine = modifiedCode.find((tmp) => tmp.line === index + 1);
        return modifiedLine ? modifiedLine.code : line;
      })
      .join("\n");

    setCode(newCode);
    setGptPin(false);
    setIsGptToggle(false);
    resetState();
    resetEditor();
    setResetTrigger(!resetTrigger);
  };

  const handleReject = () => {
    clearCurrentTimeout();
    setIsGptToggle(false);
    setGptPin(false);
    resetState();
  };

  const handleCorrect = () => {
    setGptPin(true);
    clearCurrentTimeout();
    setIsGptToggle(true);
    resetEditor();
    gptCorrectMutation.mutate();
  };

  const handleHint = () => {
    setGptPin(true);
    clearCurrentTimeout();
    setIsGptToggle(true);
    gptHintMutation.mutate();
  };
  const handleCloseHint = () => {
    clearCurrentTimeout();
    setIsGptToggle(false);
    setGptPin(false);
    resetState();
  };

  return (
    <>
      <CustomAlert />
      <div
        className="gpt-comment"
        style={{ top: gptTop, left: gptLeft, zIndex: 9999 }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {isGptCorrectSuccess ? (
          <div className="gpt-success">
            <img className="gpt-icon" src="/image/icon_gpt2.svg" alt="즉시교정" />

            <div className="container">
              {reason}
              <br />
              <div className="code-container">
                <pre className="highlighted-code">
                  {modifiedCode.map((code, index) =>
                    code.code === "" ? (
                      <div key={`ellipsis-${index}`} className="ellipsis-container">
                        <div className="line ellipsis">
                          <span style={{ color: "gray" }}>...</span>
                        </div>
                      </div>
                    ) : (
                      <SyntaxHighlighter key={`code-${index}-${code.line}`} language={"python"} style={oneLight}>
                        {code.code}
                      </SyntaxHighlighter>
                    )
                  )}
                </pre>
              </div>
            </div>
            <div className="button-left">
              <button className="approve" onClick={handleApprove}>
                교정
              </button>
              <button className="reject" onClick={handleReject}>
                거절
              </button>
            </div>
          </div>
        ) : isGptHintSuccess ? (
          <div className="gpt-hint">
            <div className="gpt-success">
              <img className="gpt-icon" src="/image/icon_gpt2.svg" alt="즉시교정" />
              {hint}
              <div className="button-left">
                <button className="approve" onClick={handleCloseHint}>
                  확인
                </button>
              </div>
            </div>
          </div>
        ) : gptCorrectMutation.isPending || gptHintMutation.isPending ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <button className="instant-correction" onClick={handleCorrect}>
              <img src="/image/icon_correction.svg" style={{ width: 19, height: 19, marginBottom: 2 }} alt="즉시교정" />
              즉시교정
            </button>
            <button className="view-hint" onClick={handleHint}>
              <img src="/image/icon_hint_color.svg" style={{ width: 19, height: 19, marginBottom: 5 }} alt="힌트보기" />
              힌트보기
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default GptComment;
