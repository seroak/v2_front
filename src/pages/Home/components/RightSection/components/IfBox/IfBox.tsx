import { ReactNode } from "react";
import styles from "./IfBox.module.css";
import cx from "classnames";
import { ConditionItem } from "@/types/conditionItem";
type Props = { children?: ReactNode; isLight: boolean ;ifItem: ConditionItem};
function IfBox({ children, isLight, ifItem }: Props) {
  return (
    <div className={styles.if}>
      <div className={cx(styles.if_border, isLight && styles.highlight)}>
        <div className={cx(styles.if_expr_div, isLight && styles.highlight)}>
          <span>{ifItem.expr}</span>
        </div>
        <span className={styles.if_text}>if</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default IfBox;
