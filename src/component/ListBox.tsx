import styles from "./ListBox.module.css";
import cx from "classnames";

type Props = {
  exprItem: string;
  isLight: boolean;
};
function ListBox({ exprItem, isLight }: Props) {
  console.log(isLight);
  return (
    <div className={cx(styles.list_box, isLight && styles.highlight)}>
      <span className={styles.text}>{exprItem}</span>
    </div>
  );
}

export default ListBox;
