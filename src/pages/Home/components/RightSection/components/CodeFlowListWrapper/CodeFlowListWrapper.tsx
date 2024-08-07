import { useRef, useEffect, ReactNode } from "react";
import cx from "classnames";
import styles from "./CodeFlowListWrapper.module.css";
//components
import CodeFlowListBlock from "./components/CodeFlowListBlock";
//type
import { CodeFlowListItem } from "@/pages/Home/types/codeFlow/codeFlowListItem";
//zustand
import { useArrowStore } from "@/store/arrow";
interface CodeFlowWrapperItemProps {
  codeFlowWrapperItem: CodeFlowListItem;
  isTracking: boolean;
  children?: ReactNode;
}
const GetCodeFlowWrapperBoxLocation = ({ codeFlowWrapperItem, isTracking, children }: CodeFlowWrapperItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && isTracking) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top - 40);
      setRight(rect.right + 10);
    }
  }, [codeFlowWrapperItem, codeFlowWrapperItem.type, isTracking]);

  return (
    <div className="useRef" ref={ref}>
      {children}
    </div>
  );
};
type Props = {
  codeFlowListItem: CodeFlowListItem;
  isTracking: boolean;
};
function CodeFlowListWrapper({ codeFlowListItem, isTracking }: Props) {
  console.log("CodeFlowListWrapper", codeFlowListItem);
  const { expr, isLight } = codeFlowListItem;
  const exprArray = expr?.slice(1, -1).split(",");

  return (
    <div className={cx("align-left", styles["fit-content"])}>
      <GetCodeFlowWrapperBoxLocation
        key={codeFlowListItem.id}
        codeFlowWrapperItem={codeFlowListItem}
        isTracking={isTracking}
      >
        <div className={styles.wrapper}>
          {exprArray?.map((exprItem, index) => {
            return <CodeFlowListBlock key={index} exprItem={exprItem} isLight={isLight} index={index} />;
          })}
        </div>
      </GetCodeFlowWrapperBoxLocation>
    </div>
  );
}

export default CodeFlowListWrapper;
