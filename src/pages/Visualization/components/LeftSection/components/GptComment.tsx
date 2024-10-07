import { useMutation } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { CodeContext } from "@/pages/Visualization/Visualization";
import { useTimeoutStore } from "@/store/timeout";
import { useGptTooltipStore } from "@/store/gptTooltip";
const GptComment = () => {
  const context = useContext(CodeContext);
  const { setTimeoutId, clearCurrentTimeout } = useTimeoutStore();
  const { setIsGptToggle, isGptToggle } = useGptTooltipStore();
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
    timeoutRef.current = setTimeout(() => {
      setIsGptToggle(false);
      setTimeoutId(null);
    }, 300);
    setTimeoutId(timeoutRef.current);
  };
  const gptCorrect = async () => {
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

  const mutation = useMutation({
    mutationFn: gptCorrect,
    async onSuccess(data) {
      console.log("data", data);
    },
    onError(error) {
      console.error("An error occurred:", error);
    },
  });

  const handleCorrect = async () => {
    mutation.mutate();
  };

  return (
    <div
      className="gpt-comment"
      style={{ top: "100px", left: "16px", zIndex: 9999 }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img src="/image/icon_gpt.svg" alt="gpt" />
      <button onClick={handleCorrect}>즉시교정</button>
      <button>힌트보기</button>
    </div>
  );
};
export default GptComment;
