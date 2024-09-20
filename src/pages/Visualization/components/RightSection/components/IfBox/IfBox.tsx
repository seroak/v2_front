import { ReactNode } from "react";

import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ConditionItem } from "@/pages/Visualization/types/codeFlow/conditionItem";

type Props = { children?: ReactNode; isLight: boolean; ifItem: ConditionItem };
function IfBox({ children, isLight, ifItem }: Props) {
  console.log(ifItem);
  return (
    <AnimatePresence key={ifItem.id}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cx("code-flow", isLight && "highlight-border", isLight && ifItem.expr === "False" && "border-false")}
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
              <span className={cx(isLight && "highlight-number", isLight && ifItem.expr === "False" && "false")}>
                {ifItem.expr?.split("").map((char, index) => (
                  <span key={index} style={{ all: "unset" }}>
                    {char}
                  </span>
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
