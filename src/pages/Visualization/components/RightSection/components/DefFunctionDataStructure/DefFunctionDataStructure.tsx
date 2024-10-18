import styles from "./DefFunctionDataStructure.module.css";
import cx from "classnames";
import { DataStructureFunctionItem } from "@/pages/Visualization/types/dataStructuresItem/dataStructureFunctionItem";

type Props = {
  functionItem: DataStructureFunctionItem;
};
const DefFunctionDataStructure = ({ functionItem }: Props) => {
  const { expr, isLight } = functionItem;

  return (
    <div>
      <div className={styles["container"]}>
        <div className={styles["left-container"]}>
          <span className={styles["def"]}>def</span>
          <img src="/image/img_function_arrow.svg" style={{ width: "30px" }} />
        </div>
        <div className={styles["right-container"]}>
          <span className={styles["func"]}>func</span>
          <div className={cx(styles["func-data"], isLight && styles.highlight)}>
            <span>{expr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefFunctionDataStructure;
