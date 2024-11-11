import { useConsoleStore } from "@/store/console";
import styles from "./Console.module.css";

const Console = () => {
  const consoleText = useConsoleStore((state) => state.console);
  const stepIdx = useConsoleStore((state) => state.stepIdx);
  const { inputData, setInputData } = useConsoleStore();
  const handleConsoleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={styles["view-section1-2"]}>
      <p className={styles["view-section-title"]}>Console</p>
      <div className={styles["view-data"]}>
        <textarea
          className={styles["input-area"]}
          value={inputData}
          onChange={(e) => handleConsoleTextChange(e)}
          placeholder="Enter text here..."
        />
        <div className={styles.consoleText}>{consoleText[stepIdx]}</div>
      </div>
    </div>
  );
};

export default Console;
