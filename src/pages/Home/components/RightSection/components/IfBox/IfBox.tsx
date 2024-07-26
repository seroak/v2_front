import { ReactNode } from "react";
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
        className={styles.if}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx(
            styles.if_border,
            isLight && styles.highlight,
            isLight && ifItem.expr === "False" && styles.false
          )}
        >
          <motion.div layout className={styles.if_title}>
            <span>if</span>
          </motion.div>
          <motion.div
            layout
            className={cx(
              styles.if_expr,
              isLight && styles.highlight,
              isLight && ifItem.expr === "False" && styles.false
            )}
          >
            {ifItem.expr?.split("").map((char, index) => (
              <span
                key={index}
                className={cx(
                  isLight && ifItem.highlights?.includes(index) && styles["font-highlight"],
                  isLight && ifItem.expr === "False" && styles["false-expr"]
                )}
              >
                {char}
              </span>
            ))}
          </motion.div>
          {children && <div>{children}</div>}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default IfBox;
