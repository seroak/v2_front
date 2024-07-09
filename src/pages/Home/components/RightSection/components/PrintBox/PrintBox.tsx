import cx from "classnames";
import styles from "./PrintBox.module.css";
import { PrintItem } from "@/types/printItem";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  printItem: PrintItem;
};
/**
 *
 * @param param0 (@link PrintItem)
 * @returns
 */

function printBox({ printItem }: Props) {
  return (
    <AnimatePresence key={printItem.id} mode="wait">
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.print}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { when: "beforeChildren" },
          }}
          exit={{ opacity: 0, transition: { when: "afterChildren" } }}
          transition={{ duration: 0.3 }}
          className={cx(
            styles.print_border,
            printItem.isLight && styles.border_highlight
          )}
        >
          <motion.div layout className={styles.print_title}>
            <span>print</span>
          </motion.div>

          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.print_expr}
          >
            {printItem.expr.split("").map((char, index) => (
              <span
                key={index}
                className={cx(
                  printItem.isLight &&
                    printItem.highlights?.includes(index) &&
                    styles.font_highlight
                )}
              >
                {char}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default printBox;
