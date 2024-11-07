import styles from "./FlowControlBox.module.css";
import cx from "classnames";
import { FlowControlItem } from "@/pages/Visualization/types/codeFlow/flowControlItem";
interface Props {
  flowControlItem: FlowControlItem;
}
function FlowControlBox({ flowControlItem }: Props) {
  const { expr } = flowControlItem;
  const dataClass =
    expr === "continue" ? styles["continue-data"] :
      expr === "break" ? styles["break-data"] :
        expr === "pass" ? styles["pass-data"] :
          styles["flow-control-data"];
  return (
    <div className={cx("code-flow-data")}>
      {expr !== "" &&
        (
        <div className={cx(dataClass)}>
        </div>
      )}
    </div>
  );
}

export default FlowControlBox;
