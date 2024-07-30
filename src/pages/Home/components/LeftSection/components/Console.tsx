import { useConsoleStore } from "@/store/console";
import styles from "./Console.module.css";

const Console = () => {
  const consoleText = useConsoleStore((state) => state.console);
  const consoleIdx = useConsoleStore((state) => state.consoleIdx);

  return (
    <div className={styles["view-section1-2"]}>
      <p className={styles["view-section-title"]}>Console</p>
      <div className={styles["view-data"]}>
        <div className={styles.consoleText}>{consoleText[consoleIdx]}</div>
      </div>
    </div>
  );
};

export default Console;
