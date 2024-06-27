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
    <div className={styles.for_box}>
      <div
        className={cx(styles.for_border, forItem.isLight && styles.highlight)}
      >
        <span className={styles.for_text}>for</span>
        <span className={styles.textName}>{forItem.target}</span>
        <div
          className={cx(
            styles.numberCur,
            forItem.isLight && forItem.curIsLight && styles.highlightNumber
          )}
        >
          <span className={styles.text}>{forItem.cur}</span>
        </div>

        <span className={styles.textStart}>start</span>
        <div
          className={cx(
            styles.numberStart,
            forItem.isLight && forItem.startIsLight && styles.highlightNumber
          )}
        >
          <span className={styles.text}>{forItem.start}</span>
        </div>

        <span className={styles.textEnd}>end</span>
        <div
          className={cx(
            styles.numberEnd,
            forItem.isLight && forItem.endIsLight && styles.highlightNumber
          )}
        >
          <span className={styles.text}>{forItem.end}</span>
        </div>
        {forItem.step === 1 ? null : (
          <>
            <span className={styles.textStep}>step</span>
            <div
              className={cx(
                styles.numberStep,
                forItem.isLight && forItem.stepIsLight && styles.highlightNumber
              )}
            >
              <span className={styles.text}>{forItem.step}</span>
            </div>
          </>
        )}

        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default ForBox;
