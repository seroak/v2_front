import { ReactNode } from "react";
import styles from "./ForBox.module.css";
import cx from "classnames";

type Props = {
  children?: ReactNode;
  animation?: boolean;
  key: number;
  start: number;
  startLightOn: boolean;
  end: number;
  endLightOn: boolean;
  cur: number;
  curLightOn: boolean;
  target: string;
  step: number;
  stepLightOn: boolean;
  lightOn: boolean;
};
function ForBox({
  children,
  start,
  startLightOn,
  end,
  endLightOn,
  cur,
  curLightOn,
  target,
  step,
  stepLightOn,
  lightOn,
}: Props) {
  return (
    <div className={styles.for_box}>
      <div className={cx(styles.for_border, lightOn && styles.highlight)}>
        <span className={styles.for_text}>for</span>
        <span className={styles.textName}>{target}</span>
        <div
          className={cx(
            styles.numberCur,
            lightOn && curLightOn && styles.highlightNumber
          )}
        >
          <span className={styles.text}>{cur}</span>
        </div>

        <span className={styles.textStart}>start</span>
        <div
          className={cx(
            styles.numberStart,
            lightOn && startLightOn && styles.highlightNumber
          )}
        >
          <span className={styles.text}>{start}</span>
        </div>

        <span className={styles.textEnd}>end</span>
        <div
          className={cx(
            styles.numberEnd,
            lightOn && endLightOn && styles.highlightNumber
          )}
        >
          <span className={styles.text}>{end}</span>
        </div>
        {step === 1 ? null : (
          <>
            <span className={styles.textStep}>step</span>
            <div
              className={cx(
                styles.numberStep,
                lightOn && stepLightOn && styles.highlightNumber
              )}
            >
              <span className={styles.text}>{step}</span>
            </div>
          </>
        )}

        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default ForBox;
