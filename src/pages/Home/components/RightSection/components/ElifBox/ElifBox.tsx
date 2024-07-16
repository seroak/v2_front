import { ReactNode } from "react";
import styles from "./ElifBox.module.css";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ConditionItem } from "@/types/conditionItem";
type Props = {
  children?: ReactNode;
  isLight: boolean;
  elifItem: ConditionItem;
};
function IfBox({ children, isLight, elifItem }: Props) {
  return (
    <AnimatePresence key={elifItem.id}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.elif}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx(
            styles.elif_border,
            elifItem.isLight && styles.highlight
          )}
        >
          <motion.div layout className={styles.elif_title}>
            <span>elif</span>
          </motion.div>
          <motion.div
            layout
            className={cx(styles.elif_expr, isLight && styles.highlight)}
          >
            <span>{elifItem.expr}</span>
          </motion.div>
          {children && <div>{children}</div>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default IfBox;
