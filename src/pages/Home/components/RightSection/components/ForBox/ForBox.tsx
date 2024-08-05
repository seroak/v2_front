import { ReactNode } from "react";
import styles from "./ForBox.module.css";
import "@/pages/Home/components/RightSection/RightSection.css";
import cx from "classnames";
import { ForItem } from "@/pages/Home/types/forItem";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: ReactNode;
  forItem: ForItem;
};

const ForBox = ({ children, forItem }: Props) => {
  return (
    <AnimatePresence key={forItem.id}>
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
          className={cx("code-flow-title-wrap")}
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
              <span className={cx(forItem.isLight && forItem.isCurLight && "highlight-number")}>{forItem.start}</span>
            </motion.div>
            <motion.div>
              <span className="code-var-title">end</span>
              <span className={cx(forItem.isLight && forItem.isCurLight && "highlight-number")}>{forItem.end}</span>
            </motion.div>
            {forItem.step === "1" ? null : (
              <motion.div>
                <span className="code-var-title">step</span>
                <span className={cx(forItem.isLight && forItem.isCurLight && styles["highlight-number"])}>
                  {forItem.step}
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        {children && <div>{children}</div>}
      </motion.div>
    </AnimatePresence>
  );
};

export default ForBox;
