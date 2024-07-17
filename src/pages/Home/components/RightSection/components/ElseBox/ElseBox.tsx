import { ReactNode } from "react";
import styles from "./ElseBox.module.css";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ConditionItem } from "@/pages/Home/types/conditionItem";
type Props = {
  children?: ReactNode;
  isLight: boolean;
  elseItem: ConditionItem;
};
function ElseBox({ children, isLight, elseItem }: Props) {
  return (
    <AnimatePresence key={elseItem.id}>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.else}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx(
            styles.else_border,
            elseItem.isLight && styles.highlight
          )}
        >
          <motion.div layout className={styles.else_title}>
            <span>else</span>
          </motion.div>
          {isLight && elseItem.expr === "True" ? (
            <motion.div
              layout
              className={cx(styles.else_expr, isLight && styles.highlight)}
            >
              <span>True</span>
            </motion.div>
          ) : null}

          {children && <div>{children}</div>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ElseBox;
