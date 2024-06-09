"use client";
import styles from "./VariableBox.module.css";
import cx from "classnames";
type Props = {
  animation?: boolean;

  value: number;
  name: string;
};
function VariableBox({ animation, value, name }: Props) {
  return (
    <div className={cx(styles.variable_box, animation && styles.box_animation)}>
      <div className={styles.variable_border}>
        <span className={styles.variable_text}>{name}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

export default VariableBox;
