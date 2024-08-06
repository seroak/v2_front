import { useRef, useEffect, ReactNode } from "react";
import styles from "./ForBox.module.css";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";

//type
import { ForItem } from "@/pages/Home/types/forItem";
//zustand
import { useArrowStore } from "@/store/arrow";
interface ForItemProps {
  forItem: ForItem;
  isTracking: boolean;
  children?: ReactNode;
}
const GetForBoxLocation = ({ forItem, isTracking, children }: ForItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const setTop = useArrowStore((state) => state.setTop);
  const setRight = useArrowStore((state) => state.setRight);

  useEffect(() => {
    if (ref.current && isTracking) {
      const rect = ref.current.getBoundingClientRect();
      setTop(rect.top + 50);
      setRight(rect.right);
    }
  }, [forItem.id, forItem.type, isTracking]);

  return (
    <div className="useRef" ref={ref}>
      {children}
    </div>
  );
};
type Props = {
  children: ReactNode;
  forItem: ForItem;
  isTracking: boolean;
};

const ForBox = ({ children, forItem, isTracking }: Props) => {
  return (
    <AnimatePresence key={forItem.id}>
      <GetForBoxLocation key={forItem.id} forItem={forItem} isTracking={isTracking}>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx("code-flow", "code-flow-for", forItem.isLight && "highlight-border")}
        >
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cx("code-flow-title-wrap", forItem.isLight && styles.highlight)}
          >
            <motion.div className="code-flow-title">
              <span>for</span>
            </motion.div>

            <motion.div className="code-flow-var">
              <motion.div>
                <span className="code-var-title">i</span>
                <span className={cx(forItem.isLight && forItem.isCurLight && "highlight-number")}>{forItem.cur}</span>
              </motion.div>
              <motion.div>
                <span className="code-var-title">start</span>
                <span className={cx(forItem.isLight && forItem.isStartLight && "highlight-number")}>
                  {forItem.start}
                </span>
              </motion.div>
              <motion.div>
                <span className="code-var-title">end</span>
                <span className={cx(forItem.isLight && forItem.isEndLight && "highlight-number")}>{forItem.end}</span>
              </motion.div>
              {forItem.step === "1" ? null : (
                <motion.div>
                  <span className="code-var-title">step</span>
                  <span className={cx(forItem.isLight && forItem.isStepLight && styles["highlight-number"])}>
                    {forItem.step}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          {children && <div>{children}</div>}
        </motion.div>
      </GetForBoxLocation>
    </AnimatePresence>
  );
};

export default ForBox;
