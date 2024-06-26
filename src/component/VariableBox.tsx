import styles from "./VariableBox.module.css";
import cx from "classnames";
type Props = {
  value: string;
  name: string;
  isLight: boolean;
};
function VariableBox({ value, name, isLight }: Props) {
  return (
    <div className={styles.variable_box}>
      <div className={cx(styles.variable_border, isLight && styles.highlight)}>
        <span className={styles.variable_text}>{name}</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

export default VariableBox;
