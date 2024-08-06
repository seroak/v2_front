import styles from "./CodeFlowVariableBox.module.css";
import cx from "classnames";
import { CodeFlowVariableItem } from "@/pages/Home/types/codeFlow/codeFlowVariableItem";
type Props = {
  codeFlowVariableItem: CodeFlowVariableItem;
};
function CodeFlowVariableBox({ codeFlowVariableItem }: Props) {
  return (
    <div className={styles["align-left"]}>
      <div className={cx(styles["var-data"], codeFlowVariableItem.isLight && styles.highlight)}>
        <span>{codeFlowVariableItem.expr}</span>
      </div>
    </div>
  );
}

export default CodeFlowVariableBox;
