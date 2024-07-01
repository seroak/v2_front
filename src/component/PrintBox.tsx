import cx from "classnames";
import styles from "./PrintBox.module.css";
import { PrintItem } from "@/types/printItem";
import { motion } from "framer-motion";
type Props = {
  printItem: PrintItem;
};
const codeFlowVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: { type: "spring", stiffness: 100, damping: 20 },
      opacity: { duration: 0.2 },
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
      opacity: { duration: 0.5 },
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { type: "spring", stiffness: 100, damping: 20, mass: 0.8 },
      opacity: { duration: 0.5 },
      when: "afterChildren",
    },
  },
};
function printBox({ printItem }: Props) {
  return (
    <motion.div
      variants={codeFlowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.print_box}>
        <div
          className={cx(
            styles.print_border,
            printItem.isLight && styles.highlight
          )}
        >
          <span className={styles.print_text}>print</span>
          <div className={styles.textOutput}>
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default printBox;
