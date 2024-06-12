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
  target: string;
  lightOn: boolean;
};
function ForBox({ children, start, end, cur, target, lightOn }: Props) {
  return (
    <div className={styles.for_box}>
      <div className={cx(styles.for_border, lightOn && styles.highlight)}>
        <span className={styles.for_text}>for</span>
        <span className={styles.textName}>{target}</span>
        <div className={styles.number_cur}>
          <span className={styles.text}>{cur}</span>
        </div>

        <span className={styles.textStart}>start</span>
        <div className={styles.number_start}>
          <span className={styles.text}>{start}</span>
        </div>
        <span className={styles.textEnd}>end</span>
        <div className={styles.number_end}>
          <span className={styles.text}>{end}</span>
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default ForBox;
