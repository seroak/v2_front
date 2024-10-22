import styles from "./ReturnBox.module.css";
import cx from "classnames";
import { ReturnItem } from "@/pages/Visualization/types/codeFlow/returnItem";
interface Props {
  returnItem: ReturnItem;
}
function ReturnBox({ returnItem }: Props) {
  console.log(returnItem);
  const { returnValue, isLight } = returnItem;
  return (
    <div>
      <span>Return</span>
      <div className={cx(styles["return-data"], isLight && styles["highlight"])}>
        <span>{returnValue}</span>
      </div>
    </div>
  );
}

export default ReturnBox;
