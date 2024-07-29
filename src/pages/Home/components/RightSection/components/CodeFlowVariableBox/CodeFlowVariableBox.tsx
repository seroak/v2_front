import styles from "./CodeFlowVariableBox.module.css";
import cx from "classnames";
import { CodeFlowVariableItem } from "@/pages/Home/types/codeFlow/codeFlowVariableItem";
type Props = {
  codeFlowVariableItem: CodeFlowVariableItem;
};
function CodeFlowVariableBox({ codeFlowVariableItem }: Props) {
  return (
    <div className={styles.variable}>
      <div className={cx(styles.variable_box, codeFlowVariableItem.isLight && styles.highlight)}>
        <span className={styles.text}>{codeFlowVariableItem.expr}</span>
      </div>
    </div>
  );
}

export default CodeFlowVariableBox;
