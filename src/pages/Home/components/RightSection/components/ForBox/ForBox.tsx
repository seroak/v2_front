import { ReactNode } from "react";
import styles from "./ForBox.module.css";
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
      <motion.div className={styles.for}>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cx(styles.for_border, forItem.isLight && styles.highlight)}
        >
          <motion.div layout className={styles["for_title"]}>
            <span>for</span>
          </motion.div>

          <motion.div layout className={styles["for_target-title"]}>
            <span>{forItem.target}</span>
          </motion.div>

          <motion.div
            layout
            className={cx(styles["cur-number"], forItem.isLight && forItem.isCurLight && styles["highlight-number"])}
          >
            <span className="white-text">{forItem.cur}</span>
          </motion.div>
          <motion.div layout className={styles["start_title"]}>
            <span>start</span>
          </motion.div>
          <motion.div
            layout
            className={cx(styles.number_start, forItem.isLight && forItem.isStartLight && styles["highlight-number"])}
          >
            <span className="white-text">{forItem.start}</span>
          </motion.div>
          <motion.div layout className={styles["end_title"]}>
            <span>end</span>
          </motion.div>

          <motion.div
            layout
            className={cx(styles.end_number, forItem.isLight && forItem.isEndLight && styles["highlight-number"])}
          >
            <span className="white-text">{forItem.end}</span>
          </motion.div>
          {forItem.step === "1" ? null : (
            <>
              <motion.div layout className={styles.step_title}>
                <span>step</span>
              </motion.div>

              <motion.div
                layout
                className={cx(styles.step_number, forItem.isLight && forItem.isStepLight && styles["highlight-number"])}
              >
                <span className="white-text">{forItem.step}</span>
              </motion.div>
            </>
          )}

          {children && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ForBox;
