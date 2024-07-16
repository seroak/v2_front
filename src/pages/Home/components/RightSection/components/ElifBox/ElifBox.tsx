import { ReactNode } from "react";
import styles from "./ElifBox.module.css";
import cx from "classnames";
import { ConditionItem } from "@/types/conditionItem";
type Props = { children?: ReactNode; isLight: boolean; elifItem: ConditionItem };
function IfBox({ children, isLight, elifItem }: Props) {
  return (
    <div className={styles.elif}>
      <div className={cx(styles.elif_border, isLight && styles.highlight)}>
        <div className={cx(styles.elif_expr_div, isLight && styles.highlight)}>
          <span>{elifItem.expr}</span>
        </div>
        <span className={styles.elif_text}>elif</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default IfBox;
