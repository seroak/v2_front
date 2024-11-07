import styles from "./FlowControlBox.module.css";
import { FlowControlItem } from "@/pages/Visualization/types/codeFlow/flowControlItem";
interface Props {
  flowControlItem: FlowControlItem;
}
function FlowControlBox({ flowControlItem }: Props) {
  const { expr } = flowControlItem;
  const dataClass =
    expr === "continue"
      ? styles["continue-data"]
      : expr === "break"
      ? styles["break-data"]
      : expr === "pass"
      ? styles["pass-data"]
      : styles["flow-control-data"];
  return <div className="code-flow-data">{expr !== "" && <div className={dataClass}></div>}</div>;
}

export default FlowControlBox;
