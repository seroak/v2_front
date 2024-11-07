import { useRef, useEffect, ReactNode } from "react";
import cx from "classnames";
import styles from "./CodeFlowTupleWrapper.module.css";
//components
import CodeFlowTupleBlock from "./components/CodeFlowTupleBlock.tsx";
//type
import { CodeFlowTupleItem } from "@/pages/Visualization/types/codeFlow/codeFlowTupleItem.ts";
//zustand
import { useArrowStore } from "@/store/arrow";

interface CodeFlowWrapperItemProps {
  codeFlowWrapperItem: CodeFlowTupleItem;
  height: number;
  width: number;
  children?: ReactNode;
}

const GetCodeFlowWrapperBoxLocation = ({ codeFlowWrapperItem, height, width, children }: CodeFlowWrapperItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && codeFlowWrapperItem.isLight) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top - 40);
      setRight(rect.right + 10);
    }
  }, [codeFlowWrapperItem, height, width]);

  return (
    <div className="useRef" ref={ref}>
      {children}
    </div>
  );
};
type Props = {
  codeFlowTupleItem: CodeFlowTupleItem;
  height: number;
  width: number;
};

function CodeFlowTupleWrapper({ codeFlowTupleItem, height, width }: Props) {
  const { expr, isLight } = codeFlowTupleItem;
  const exprArray = expr?.slice(1, -1).split(",");

  return (
    <div className={cx("align-left", styles["fit-content"])}>
      <GetCodeFlowWrapperBoxLocation
        key={codeFlowTupleItem.id}
        height={height}
        width={width}
        codeFlowWrapperItem={codeFlowTupleItem}
      >
        <div className={styles.wrapper}>
          <div className={styles["direction-column"]}>
            <img src="/image/img_lock.png" alt="자물쇠" className={styles["tuple-lock"]}></img>
            <div style={{ display: "flex" }}>
              {exprArray?.map((exprItem, index) => {
                return <CodeFlowTupleBlock key={index} exprItem={exprItem} isLight={isLight} index={index} />;
              })}
            </div>
          </div>
        </div>
      </GetCodeFlowWrapperBoxLocation>
    </div>
  );
}

export default CodeFlowTupleWrapper;
