import { ReactNode } from "react";
import styles from "./ElseBox.module.css";
import cx from "classnames";
type Props = { children?: ReactNode; isLight: boolean };
function IfBox({ children, isLight }: Props) {
  return (
    <div className={styles.else}>
      <div className={cx(styles.else_border, isLight && styles.highlight)}>
        <span className={styles.else_text}>else</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default IfBox;
