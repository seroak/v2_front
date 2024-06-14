import { ReactNode } from "react";
import styles from "./ForBox.module.css";
import cx from "classnames";
type Props = { children?: ReactNode; lightOn: boolean };
function IfBox({ children, lightOn }: Props) {
  return (
    <div className={styles.for_box}>
      <div className={cx(styles.for_border, lightOn && styles.highlight)}>
        <span className={styles.for_text}>if</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default IfBox;
