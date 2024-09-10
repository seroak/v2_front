import styles from "./VariableBox.module.css";
import cx from "classnames";
type Props = {
  value: string;
  name: string;
  isLight: boolean;
};
function VariableBox({ value, name, isLight }: Props) {
  return (
    <li>
      <span>{name}</span>
      <div className={cx(styles["var-data"], isLight && styles.highlight)}>
        <span>{value}</span>
      </div>
    </li>
  );
}

export default VariableBox;
