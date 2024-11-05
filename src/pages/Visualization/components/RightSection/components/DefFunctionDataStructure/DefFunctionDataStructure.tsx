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
      <li className="right-arrow">
        <p>def</p>
        <div>
          <span>func</span>
          <div className={cx("var-data")}>
            <span className={cx(isLight && styles.highlight)}>{expr}</span>
          </div>
        </div>
      </li>
    </div>
  );
};

export default DefFunctionDataStructure;
