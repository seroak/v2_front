import { useConsoleStore } from "@/store/console";
import styles from "./Console.module.css";

const Console = () => {
  const consoleText = useConsoleStore((state) => state.consoleList);
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
      <textarea
        className={styles["input-area"]}
        value={inputData}
        onChange={(e) => handleConsoleTextChange(e)}
        placeholder="input을 입력해주세요."
      />
      <div className={styles["view-data"]}>
        <div className={styles.consoleText}>{consoleText[stepIdx]}</div>
      </div>
    </div>
  );
};

export default Console;
