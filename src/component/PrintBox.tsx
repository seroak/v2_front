"use client";

import cx from "classnames";
import styles from "./PrintBox.module.css";
type Props = { expr: string; animation: number[] };
function printBox({ expr, animation }: Props) {
  return (
    <div className={styles.print_box}>
      <div className={styles.print_border}>
        <span className={styles.print_text}>print</span>
        <div className={styles.textOutput}>
          {expr.split("").map((char, index) => (
            <span
              key={index}
              className={cx(animation.includes(index) && styles.highlight)}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default printBox;
