import { ReactNode } from "react";
import styles from "./ForBox.module.css";
import "@/pages/Home/components/RightSection/RightSection.css";
import cx from "classnames";
import { WhileItem } from "@/pages/Home/types/WhileItem";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: ReactNode;
  WhileItem: WhileItem;
};

const WhileBox = ({ children, WhileItem }: Props) => {
  return (
    <AnimatePresence key={WhileItem.id}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cx("code-flow", "code-flow-While", WhileItem.isLight && "highlight-border")}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx("code-flow-title-wrap", WhileItem.isLight && styles.highlight)}
        >
          <motion.div className="code-flow-title">
            <span>while</span>
          </motion.div>
        </motion.div>
        {children && <div>{children}</div>}
      </motion.div>
    </AnimatePresence>
  );
};

export default WhileBox;
