import styles from "./ListBlock.module.css";
import cx from "classnames";

type Props = {
  exprItem: string;
  isLight: boolean;
  index: number;
};
<<<<<<< HEAD:src/pages/Home/components/RightSection/components/ListWrapper/components/ListBlock.tsx
function ListBlock({ exprItem, isLight, index }: Props) {
  console.log(isLight);
=======
function ListBox({ exprItem, isLight, index }: Props) {
>>>>>>> feature/isssue41:src/pages/Home/components/RightSection/components/ListDiv/components/ListBox.tsx
  return (
    <div>
      <div className={cx(styles.list, isLight && styles.highlight)}>
        <span className={styles.text}>{exprItem}</span>
      </div>
      <span className={cx(styles.Noto_Serif_KR, styles.index)}>{index}</span>
    </div>
  );
}

export default ListBlock;
