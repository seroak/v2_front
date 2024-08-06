import styles from "../CodeFlowListWrapper.module.css";
import cx from "classnames";

type Props = {
  exprItem: string;
  isLight: boolean;
  index: number;
};
export const CodeFlowListBlock = ({ exprItem, isLight, index }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className={cx(styles["var-data"], isLight && styles.highlight)}>
        <span className={styles.text}>{exprItem}</span>
      </div>
      <span className={styles.index}>{index}</span>
    </div>
  );
};
