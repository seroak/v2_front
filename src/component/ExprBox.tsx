import { ReactNode } from "react";
import styles from "./Expr_Box.module.css";
type Props = { children?: ReactNode };
function ExprBox({ children }: Props) {
  return (
    <div className={styles.Expr_box}>
      <div className={styles.Expr_border}>
        <span>"*" * (1+1)</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export default ExprBox;
