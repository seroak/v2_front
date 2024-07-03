import cx from "classnames";
import styles from "./PrintBox.module.css";
import { PrintItem } from "@/types/printItem";

type Props = {
  printItem: PrintItem;
};

function printBox({ printItem }: Props) {
  return (
    <div className={styles.print_box}>
      <div
        className={cx(
          styles.print_border,
          printItem.isLight && styles.highlight
        )}
      >
        <span className={styles.print_text}>print</span>
        <div className={styles.textOutput}>
          {printItem.expr.split("").map((char, index) => (
            <span
              key={index}
              className={cx(
                printItem.isLight &&
                  printItem.highlights?.includes(index) &&
                  styles.font_highlight
              )}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default printBox;
