"use client";
import { ReactNode } from "react";
import styles from "./ForBox.module.css";
import cx from "classnames";
type Props = { children?: ReactNode; animation?: boolean };
function IfBox({ children, animation }: Props) {
  return (
    <div className={cx(styles.for_box, animation && styles.box_animation)}>
      <div className={styles.for_border}>
        <span className={styles.for_text}>else</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default IfBox;
