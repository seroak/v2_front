"use client";
import { ReactNode } from "react";
import styles from "./ForBox.module.css";
import cx from "classnames";

type Props = {
  children?: ReactNode;
  animation?: boolean;
  key: number;
  start: number;
  end: number;
  cur: number;
  name: string;
  lightOn: boolean;
};
function ForBox({ children, start, end, cur, name, lightOn }: Props) {
  return (
    <div className={styles.for_box}>
      <div className={cx(styles.for_border, lightOn && styles.highlight)}>
        <span className={styles.for_text}>for</span>
        <span className={styles.for_cur}>{name}</span>
        <div className={styles.number_cur}>
          <span>{cur}</span>
        </div>

        <span className={styles.for_start}>start</span>
        <div className={styles.number_start}>
          <span>{start}</span>
        </div>
        <span className={styles.for_end}>end</span>
        <div className={styles.number_end}>
          <span>{end}</span>
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default ForBox;
