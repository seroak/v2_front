import { useRef, useEffect, ReactNode } from "react";
import styles from "./CodeFlowVariableBox.module.css";
import cx from "classnames";

//type
import { CodeFlowVariableItem } from "@/pages/Home/types/codeFlow/codeFlowVariableItem";

//zustand
import { useArrowStore } from "@/store/arrow";
interface CodeFlowVariableItemProps {
  codeFlowVariableItem: CodeFlowVariableItem;
  isTracking: boolean;
  children?: ReactNode;
}
const GetCodeFlowVariableBoxLocation = ({ codeFlowVariableItem, isTracking, children }: CodeFlowVariableItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && isTracking) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top - 40);
      setRight(rect.right + 10);
    }
  }, [codeFlowVariableItem.id, codeFlowVariableItem.type, isTracking]);

  return (
    <div className="useRef" ref={ref}>
      {children}
    </div>
  );
};
type Props = {
  codeFlowVariableItem: CodeFlowVariableItem;
  isTracking: boolean;
};
const CodeFlowVariableBox = ({ codeFlowVariableItem, isTracking }: Props) => {
  return (
    <div className={styles.variable}>
      <div className={cx(styles.variable_box, codeFlowVariableItem.isLight && styles.highlight)}>
        <GetCodeFlowVariableBoxLocation
          key={codeFlowVariableItem.id}
          codeFlowVariableItem={codeFlowVariableItem}
          isTracking={isTracking}
        >
          <span className={styles.text}>{codeFlowVariableItem.expr}</span>
        </GetCodeFlowVariableBoxLocation>
    <div className={styles["align-left"]}>
      <div className={cx(styles["var-data"], codeFlowVariableItem.isLight && styles.highlight)}>
        <span>{codeFlowVariableItem.expr}</span>
      </div>
    </div>
  );
};

export default CodeFlowVariableBox;
