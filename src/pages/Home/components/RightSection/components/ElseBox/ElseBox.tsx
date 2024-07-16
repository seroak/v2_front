import { ReactNode } from "react";
import styles from "./ElseBox.module.css";
import cx from "classnames";
import { ConditionItem } from "@/types/conditionItem";
type Props = { children?: ReactNode; isLight: boolean, elseItem:ConditionItem };
function ElseBox({ children, isLight ,elseItem}: Props) {
  return (
    <div className={styles.else}>
      <div className={cx(styles.else_border, isLight && styles.highlight)}>

        <span className={styles.else_text}>else</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default ElseBox;
