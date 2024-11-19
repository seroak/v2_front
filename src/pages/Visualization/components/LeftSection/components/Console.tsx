import { useEffect, useContext } from "react";
import { useConsoleStore } from "@/store/console";
import { InputErrorContext } from "@/pages/Visualization/context/InputErrorContext";
import cx from "classnames";
import styles from "./Console.module.css";

const Console = () => {
  const { consoleList, setConsoleList } = useConsoleStore();
  const stepIdx = useConsoleStore((state) => state.stepIdx);
  const inputErrorContext = useContext(InputErrorContext);
  if (!inputErrorContext) {
    throw new Error("InputErrorContext not found");
  }
  const { inputData, setInputData } = useConsoleStore();
  const { isInputError, setIsInputError } = inputErrorContext;

  useEffect(() => {
    setConsoleList([]);
  }, []);
  const handleConsoleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const clickInput = () => {
    setIsInputError(false);
  };
  return (
    <div className={styles["console-wrapper"]}>
      <div className={styles["view-section1-2"]}>
        <p className={styles["view-section-title"]}>콘솔</p>
        <textarea
          className={cx(styles["input-area"], isInputError && styles["input-error"])}
          value={inputData}
          onClick={clickInput}
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
