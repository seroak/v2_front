import { useGptTooltipStore } from "@/store/gptTooltip";

const GptIcon = () => {
  const { gptLeft, gptTop } = useGptTooltipStore();

  return (
    <div className="gpt-comment-small" style={{ top: gptTop, left: gptLeft, zIndex: 9999 }}>
      <img
        className="gpt-icon-small"
        style={{
          width: "30px",
          height: "30px",
          position: "relative",
          left: "-8px",
          top: "4px",
        }}
        src="/image/icon_gpt2.svg"
        alt="즉시교정"
      />
    </div>
  );
};
export default GptIcon;
