import { ReactNode } from "react";
import styles from "./IfBox.module.css";
import cx from "classnames";
type Props = { children?: ReactNode; isLight: boolean };
function IfBox({ children, isLight }: Props) {
  return (
    <div className={styles.if}>
      <div className={cx(styles.if_border, isLight && styles.highlight)}>
        <span className={styles.if_text}>if</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default IfBox;
