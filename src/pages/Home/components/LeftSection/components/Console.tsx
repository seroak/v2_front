import { useConsoleStore } from "@/store/console";
import styles from "./Console.module.css";

const Console = () => {
  const consoleText = useConsoleStore((state) => state.console);
  const consoleIdx = useConsoleStore((state) => state.consoleIdx);

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        <div className={styles.consoleText}>{consoleText[consoleIdx]}</div>
      </div>
    </div>
  );
};

export default Console;
