import { ReactNode } from "react";
import "../../RightSection.css";
import styles from "./IfBox.module.css";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ConditionItem } from "@/pages/Home/types/conditionItem";

type Props = { children?: ReactNode; isLight: boolean; ifItem: ConditionItem };
function IfBox({ children, isLight, ifItem }: Props) {
  return (
    <AnimatePresence key={ifItem.id}>
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
            <span>if</span>
          </motion.div>
          <div className="code-flow-var">
            <div>
              <span className={cx(isLight && "highlight-number", isLight && ifItem.expr === "False" && styles.false)}>
                {ifItem.expr?.split("").map((char, index) => (
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

export default IfBox;
