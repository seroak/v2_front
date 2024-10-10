import { useGptTooltipStore } from "@/store/gptTooltip";

const GptIcon = () => {
  const { gptLeft, gptTop } = useGptTooltipStore();

  return (
    <div className="gpt-comment" style={{ top: gptTop, left: gptLeft, zIndex: 9999 }}>
      <img src="/image/icon_gpt.svg" alt="gpt" />
    </div>
  );
};
export default GptIcon;
