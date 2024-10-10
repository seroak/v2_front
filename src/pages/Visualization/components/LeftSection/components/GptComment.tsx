import { useMutation } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { CodeContext } from "@/pages/Visualization/Visualization";
import { useTimeoutStore } from "@/store/timeout";
import { useGptTooltipStore } from "@/store/gptTooltip";
import { useEditorStore } from "@/store/editor";
interface ModifidCode {
  line: number;
  code: string;
}
const GptComment = () => {
  const context = useContext(CodeContext);
  const { setTimeoutId, clearCurrentTimeout } = useTimeoutStore();
  const { setIsGptToggle } = useGptTooltipStore();
  const { resetEditor, errorLine } = useEditorStore();
  const gptPin = useGptTooltipStore((state) => state.gptPin);
  const setGptPin = useGptTooltipStore((state) => state.setGptPin);
  const [hint, setHint] = useState<string>("");
  const [hintLine, setHintLine] = useState<number>(0);
  const { gptLeft, gptTop } = useGptTooltipStore();

  const [reason, setReason] = useState<string>("");
  const [modifiedCode, setModifiedCode] = useState<ModifidCode[]>([]);
  const timeoutRef = useRef<number | null>(null);
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }

  const { code, setCode } = context;
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
  const fetchGptCorrect = async (code: any) => {
    const response = await fetch("http://localhost:8080/edupi-syntax/v1/advice/correct", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source_code: code }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const gptCorrectMutation = useMutation({
    mutationFn: fetchGptCorrect,
    async onSuccess(data) {
      setReason(data.result.reason);
      const newModifiedCode = data.result.modified_codes.reduce((acc: ModifidCode[], cur: ModifidCode) => {
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
    },
    onError(error) {
      console.error("An error occurred:", error);
    },
  });
  const fetchGptHint = async (code: any) => {
    const response = await fetch("http://localhost:8080/edupi-syntax/v1/advice/hint", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ line: errorLine?.lineNumber, source_code: code }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const gptHintMutation = useMutation({
    mutationFn: fetchGptHint,
    async onSuccess(data) {
      setHint(data.result.hint);
      setHintLine(data.result.line);
    },
    onError(error) {
      console.error("An error occurred:", error);
    },
  });
  const handleAprrove = () => {
    const newCode = code
      .split("\n")
      .map((line, index) => {
        if (modifiedCode[index] && modifiedCode[index].line === index + 1) {
          return modifiedCode[index].code;
        }
        return line;
      })
      .join("\n");
    console.log("원래 코드", code);
    console.log("전처리된 코드", newCode);
    setCode(newCode);
    setGptPin(false);
    setIsGptToggle(false);
  };

  // 창을 닫는 버튼
  const handleReject = () => {
    clearCurrentTimeout();
    setIsGptToggle(false);
    setGptPin(false);
  };

  // 즉시 교정 버튼
  const handleCorrect = async () => {
    setGptPin(true);
    clearCurrentTimeout();
    setIsGptToggle(true);
    resetEditor();
    gptCorrectMutation.mutate(code);
  };

  // 힌트보기 버튼
  const handleHint = async () => {
    setGptPin(true);
    clearCurrentTimeout();
    setIsGptToggle(true);
    gptHintMutation.mutate(code);
  };

  return (
    <div
      className="gpt-comment"
      style={{ top: gptTop, left: gptLeft, zIndex: 9999 }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img src="/image/icon_gpt.svg" alt="gpt" />

      {gptCorrectMutation.isSuccess ? (
        <div className="gpt-success">
          이유: {reason}
          <br />
          <div className="code-container">
            <div className="gpt-line-numbers">
              {modifiedCode.map((code, index) => (
                <div key={index}>
                  {code.line === 0 ? (
                    <div className="ellipsis-container">
                      <div className="line ellipsis">⋮</div>
                    </div>
                  ) : (
                    <span>{code.line}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="code-content">
              {modifiedCode.map((code, index) => (
                <div key={index}>
                  {code.code === "" ? (
                    <div className="ellipsis-container">
                      <div className="line ellipsis">
                        <span>⋮</span>
                      </div>
                    </div>
                  ) : (
                    <span>{code.code}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="button-left">
            <button className="approve" onClick={handleAprrove}>
              수락
            </button>
            <button className="reject" onClick={handleReject}>
              거절
            </button>
          </div>
        </div>
      ) : gptHintMutation.isSuccess ? (
        <div className="gpt-hint">
          <div>힌트 라인: {hintLine}</div>
          <div>힌트: {hint}</div>
          <div className="button-left">
            <button className="approve" onClick={handleAprrove}>
              수락
            </button>
          </div>
        </div>
      ) : gptCorrectMutation.isPending || gptHintMutation.isPending ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <button onClick={handleCorrect}>즉시교정</button>
          <button onClick={handleHint}>힌트보기</button>
        </>
      )}
    </div>
  );
};
export default GptComment;
