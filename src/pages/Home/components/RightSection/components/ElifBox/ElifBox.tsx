import { ReactNode } from "react";
import styles from "./ElifBox.module.css";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ConditionItem } from "@/pages/Home/types/conditionItem";

type Props = {
  children: ReactNode;
  isLight: boolean;
  elifItem: ConditionItem;
};
function ElifBox({ children, isLight, elifItem }: Props) {
  return (
    <AnimatePresence key={elifItem.id}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cx("code-flow", isLight && "highlight-border")}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx("code-flow-title-wrap")}
        >
          <motion.div layout className="code-flow-title">
            <span>elif</span>
          </motion.div>
          <div className="code-flow-var">
            <div>
              <span className={cx(isLight && "highlight-number", isLight && elifItem.expr === "False" && styles.false)}>
                {elifItem.expr?.split("").map((char, index) => (
                  <text key={index}>{char}</text>
                ))}
              </span>
            </div>
          </div>
        </motion.div>
        {children && <div>{children}</div>}
      </motion.div>
    </AnimatePresence>
  );
}

export default ElifBox;
