import styles from "./ListBlock.module.css";
import cx from "classnames";

type Props = {
  exprItem: string;
  isLight: boolean;
  index: number;
};
export const ListBlock = ({ exprItem, isLight, index }: Props) => {
  return (
    <div>
      <div className={cx(styles.list, isLight && styles.highlight)}>
        <span className={styles.text}>{exprItem}</span>
      </div>
      <span className={cx(styles.Noto_Serif_KR, styles.index)}>{index}</span>
    </div>
  );
};