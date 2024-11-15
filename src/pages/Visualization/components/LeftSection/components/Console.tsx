import { useEffect } from "react";
import { useConsoleStore } from "@/store/console";
import styles from "./Console.module.css";

const Console = () => {
  const { consoleList, setConsoleList } = useConsoleStore();
  const stepIdx = useConsoleStore((state) => state.stepIdx);
  const { inputData, setInputData } = useConsoleStore();
  const handleConsoleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    setConsoleList([]);
  }, []);
  return (
    <div className={styles["console-wrapper"]}>
      <div className={styles["view-section1-2"]}>

        <p className={styles["view-section-title"]}>Console</p>
        <textarea
          className={styles["input-area"]}
          value={inputData}
          onChange={(e) => handleConsoleTextChange(e)}
            placeholder="input()을 사용하는 경우 입력해주세요."
        />
        <div className={styles["view-data"]}>
          <div className={styles.consoleText}>
            <span className={styles["console-print"]}>{consoleList[stepIdx]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Console;
