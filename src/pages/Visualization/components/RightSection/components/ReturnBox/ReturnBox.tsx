import styles from "./ReturnBox.module.css";
import cx from "classnames";
import { ReturnItem } from "@/pages/Visualization/types/codeFlow/returnItem";
interface Props {
  returnItem: ReturnItem;
}
function ReturnBox({ returnItem }: Props) {
  const { returnExpr, isLight } = returnItem;
  return (
    <div className={cx("code-flow-data")}>
      {returnExpr !== "" && (
        <div className={cx(styles["return-data"])}>
          <p className={cx(isLight && styles["highlight"], returnExpr == "False" && styles["data-false"])}>{returnExpr}</p>
        </div>
      )}
    </div>
  );
}

export default ReturnBox;
