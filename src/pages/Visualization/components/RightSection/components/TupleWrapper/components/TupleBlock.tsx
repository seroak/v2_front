import styles from "../TupleWrapper.module.css";
import cx from "classnames";

type Props = {
  exprItem: string;
  isLight?: boolean;
  isLightCheck: boolean;
  index: number;
};
export const TupleBlock = ({ exprItem, isLight, isLightCheck, index }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className={cx(styles["var-data"], isLight && isLightCheck && styles.highlight)}>
        <span className={styles.text}>{exprItem}</span>
      </div>
      <span className={styles.index}>{index}</span>
    </div>
  );
};
