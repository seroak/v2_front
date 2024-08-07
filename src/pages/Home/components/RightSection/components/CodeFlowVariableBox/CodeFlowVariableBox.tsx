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
  height: number;
  width: number;
  children?: ReactNode;
}
const GetCodeFlowVariableBoxLocation = ({
  codeFlowVariableItem,
  isTracking,
  height,
  width,
  children,
}: CodeFlowVariableItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && isTracking) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top - 40);
      setRight(rect.right + 10);
    }
  }, [codeFlowVariableItem.id, codeFlowVariableItem.type, isTracking, height, width]);

  return (
    <div className="useRef" ref={ref}>
      {children}
    </div>
  );
};
type Props = {
  codeFlowVariableItem: CodeFlowVariableItem;
  isTracking: boolean;
  height: number;
  width: number;
};
const CodeFlowVariableBox = ({ codeFlowVariableItem, isTracking, height, width }: Props) => {
  return (
    <div className={styles["align-left"]}>
      <div className={cx(styles["var-data"], codeFlowVariableItem.isLight && styles.highlight)}>
        <GetCodeFlowVariableBoxLocation
          key={codeFlowVariableItem.id}
          codeFlowVariableItem={codeFlowVariableItem}
          isTracking={isTracking}
          height={height}
          width={width}
        >
          <span className={styles.text}>{codeFlowVariableItem.expr}</span>
        </GetCodeFlowVariableBoxLocation>
      </div>
    </div>
  );
};

export default CodeFlowVariableBox;
