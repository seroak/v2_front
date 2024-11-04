import { ReactNode } from "react";

import styles from "./CallUserFuncBox.module.css";
import { CallUserFuncItem } from "@/pages/Visualization/types/codeFlow/callUserFuncItem";
import cx from "classnames";

interface CallUserFuncProps {
  callUserFuncItem: CallUserFuncItem;
  children?: ReactNode;
}

const CallUserFuncBox = ({ callUserFuncItem, children }: CallUserFuncProps): ReactNode => {
  const { signature, assignName, isLight } = callUserFuncItem;

  return (
    <>
      {assignName == "" ? null : (
        <>
          <div className={styles["func-val"]}>
            <div>
              <span>{assignName}</span>
              <p className={cx(styles["var-data"], isLight && styles.highlight)}>
              </p>
            </div>
          </div>
        </>
      )}
      <div className={cx("code-flow", "code-flow-func")}>
        <div className={"code-flow-title-wrap"}>
          <div className={"func-title"}>
            <span>{signature}</span>
          </div>
        </div>
        <div className={"func-box-children"}>{children && <div>{children}</div>}</div>
      </div>
    </>
  );
};

export default CallUserFuncBox;
