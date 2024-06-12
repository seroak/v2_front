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
  step: number;
  lightOn: boolean;
};
function ForBox({ children, start, end, cur, target, step, lightOn }: Props) {
  return (
    <div className={styles.for_box}>
      <div className={cx(styles.for_border, lightOn && styles.highlight)}>
        <span className={styles.for_text}>for</span>
        <span className={styles.textName}>{target}</span>
        <div className={styles.numberCur}>
          <span className={styles.text}>{cur}</span>
        </div>

        <span className={styles.textStart}>start</span>
        <div className={styles.numberStart}>
          <span className={styles.text}>{start}</span>
        </div>

        <span className={styles.textEnd}>end</span>
        <div className={styles.numberEnd}>
          <span className={styles.text}>{end}</span>
        </div>
        {step === 1 ? null : (
          <>
            <span className={styles.textStep}>step</span>
            <div className={styles.numberStep}>
              <span className={styles.text}>{step}</span>
            </div>{" "}
          </>
        )}

        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default ForBox;
