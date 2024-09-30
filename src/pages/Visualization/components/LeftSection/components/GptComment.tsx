import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { CodeContext } from "@/pages/Visualization/Visualization";

const GptComment = () => {
  const context = useContext(CodeContext);
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }

  const { code, setCode } = context;
  const gptCorrect = async () => {
    const response = await fetch("http://locallhost:8080/edupi-syntax/v1/correct", {
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
      for (const step of data.result.steps) {
        const row = step.row;
        const correct = step.correct;
      }
    },
    onError(error) {
      console.error("An error occurred:", error);
    },
  });
  const handleClick = async () => {
    mutation.mutate();
  };

  return (
    <div className="gpt-comment" style={{ top: "100px", left: "16px" }}>
      <img src="/image/icon_gpt.svg" alt="gpt" />
      <p>괄호가 하나 부족해요!</p>
    </div>
  );
};
export default GptComment;
