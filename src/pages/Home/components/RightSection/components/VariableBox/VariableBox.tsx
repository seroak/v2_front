import styles from "./VariableBox.module.css";
import cx from "classnames";
type Props = {
  value: string;
  name: string;
  isLight: boolean;
};
function VariableBox({ value, name, isLight }: Props) {
  return (
    <div className={styles.variable}>
      <span className={styles.variable_name}>{name}</span>
      <div className={cx(styles.variable_box, isLight && styles.highlight)}>
        <span className={styles.text}>{value}</span>
      </div>
    </div>
  );
}

export default VariableBox;
