import { ReactNode } from "react";
import styles from "./ForBox.module.css";
import cx from "classnames";
import { ForItem } from "@/types/forItem";

type Props = {
  children?: ReactNode;
  forItem: ForItem;
};

function ForBox({ children, forItem }: Props) {
  return (
    <div className={styles.for}>
      <div
        className={cx(styles.for_border, forItem.isLight && styles.highlight)}
      >
        <span className={styles["text-for"]}>for</span>
        <span className={styles["text-target"]}>{forItem.target}</span>
        <div
          className={cx(
            styles.numberCur,
            forItem.isLight && forItem.isCurLight && styles.highlightNumber
          )}
        >
          <span className="white-text">{forItem.cur}</span>
        </div>

        <span className={styles["text-start"]}>start</span>
        <div
          className={cx(
            styles.numberStart,
            forItem.isLight && forItem.isStartLight && styles.highlightNumber
          )}
        >
          <span className="white-text">{forItem.start}</span>
        </div>

        <span className={styles["text-end"]}>end</span>
        <div
          className={cx(
            styles.numberEnd,
            forItem.isLight && forItem.isEndLight && styles.highlightNumber
          )}
        >
          <span className="white-text">{forItem.end}</span>
        </div>
        {forItem.step === 1 ? null : (
          <>
            <span className={styles.textStep}>step</span>
            <div
              className={cx(
                styles.numberStep,
                forItem.isLight &&
                  forItem.isStepLight &&
                  styles["highlight-number"]
              )}
            >
              <span className="white-text">{forItem.step}</span>
            </div>
          </>
        )}

        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default ForBox;
