import cx from "classnames";
import styles from "./PrintBox.module.css";
import { PrintItem } from "@/pages/Home/types/printItem";
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
        className={cx("code-flow", "code-flow-text", styles.padding, printItem.isLight && "highlight-border")}
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="code-flow-title-wrap"
        >
          <motion.div className="code-flow-title">
            <span>print</span>
          </motion.div>
        </motion.div>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="code-flow-data"
        >
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.print_expr}
          >
            {printItem.expr.split("").map((char, index) => (
              <motion.span
                key={index}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={cx(
                  styles["print-text"],
                  printItem.isLight && printItem.highlights?.includes(index) && "highlight-text"
                )}
                style={{ whiteSpace: "pre", fontSize: "18px" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default printBox;
