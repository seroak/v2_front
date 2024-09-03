import { ReactNode } from "react";

import cx from "classnames";
import { WhileItem } from "@/pages/Visualization/types/codeFlow/whileItem";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: ReactNode;
  whileItem: WhileItem;
};

const WhileBox = ({ children, whileItem }: Props) => {
  return (
    <AnimatePresence key={whileItem.id}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cx("code-flow", "code-flow-While", whileItem.isLight && "highlight-border")}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx("code-flow-title-wrap", whileItem.isLight && "highlight")}
        >
          <motion.div className="code-flow-title">
            <span>while</span>
          </motion.div>
          <div className="code-flow-var">
            <div>
              <span
                className={cx(
                  whileItem.isLight && "highlight-number",
                  whileItem.isLight && whileItem.expr === "False" && "false"
                )}
              >
                {whileItem.expr?.split("").map((char, index) => (
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
};

export default WhileBox;
