"use client";
import { ReactNode } from "react";
import styles from "./ForBox.module.css";

type Props = {
  children?: ReactNode;
  animation?: boolean;
  key: number;
  start: number;
  end: number;
  cur: number;
};
function ForBox({ children, start, end, cur }: Props) {
  return (
    <div className={styles.for_box}>
      <div className={styles.for_border}>
        <span className={styles.for_text}>for</span>
        <span className={styles.for_cur}>cur</span>
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
