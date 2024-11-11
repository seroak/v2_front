import styles from "./InputBox.module.css";
import cx from "classnames";
import { InputItem } from "@/pages/Visualization/types/codeFlow/inputItem";
interface Props {
  InputItem: InputItem;
}
function InputBox({ InputItem }: Props) {
  return (
    <div className={cx("code-flow-data", styles["input"])}>
      <p className={styles["input-text"]}>{InputItem.expr}</p>
    </div>
  );
}

export default InputBox;
