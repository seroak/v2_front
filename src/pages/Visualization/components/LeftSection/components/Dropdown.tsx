import styles from "../LeftSection.module.css";
import { useEffect, useRef, useState, useContext } from "react";
import { CodeContext } from "@/pages/Visualization/context/CodeContext";
import { useConsoleStore } from "@/store/console";
import { basic_codes, control_codes, function_codes, input_codes } from "./exampleCode.ts";
import { PreprocessedCodesContext } from "@/pages/Visualization/context/PreProcessedCodesContext.ts";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("샘플 코드");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const codeContext = useContext(CodeContext);
  if (!codeContext) {
    throw new Error("CodeContext not found");
  }
  const { setCode } = codeContext;
  // 외부 클릭 감지를 위한 useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const { setInputData, resetConsole } = useConsoleStore();
  const { setPreprocessedCodes } =  useContext(PreprocessedCodesContext);

  const updateOption = (optionText: string, code: string, input: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedOption(optionText);
    setCode(code);
    setInputData(input);
    resetConsole();
    setPreprocessedCodes([]);
    setIsOpen(false);
  };

  return (
    <div className={styles["select-box"]} ref={dropdownRef}>
      <div
        className={`${styles["default-option"]} ${
          selectedOption !== "샘플 코드" ? styles["is_selected"] : ""
        }`}
        onClick={toggleDropdown}
      >
        <button id="selected-option">{selectedOption}</button>
        <img src="/image/icon_down_arrow.svg" alt="arrow" />
      </div>
      <ul className={styles["dropdown-menu"]} style={{ display: isOpen ? "block" : "none" }}>
        <li className={styles["main-option"]}>
          <p className={styles.step1}>기초</p>
          <ul className={styles["sub-options"]}>
            {basic_codes.map(([title, code, input], index) => (
              <li key={index}>
                <button onClick={(e) => updateOption(title, code, input, e)}>{title}</button>
              </li>
            ))}
          </ul>
        </li>
        <li className={styles["main-option"]}>
          <p className={styles.step1}>제어문</p>
          <ul className={styles["sub-options"]}>
            {control_codes.map(([title, code, input], index) => (
              <li key={index}>
                <button onClick={(e) => updateOption(title, code, input, e)}>{title}</button>
              </li>
            ))}
          </ul>
        </li>
        <li className={styles["main-option"]}>
          <p className={styles.step1}>입출력</p>
          <ul className={styles["sub-options"]}>
            {input_codes.map(([title, code, input], index) => (
              <li key={index}>
                <button onClick={(e) => updateOption(title, code, input, e)}>{title}</button>
              </li>
            ))}
          </ul>
        </li>
        <li className={styles["main-option"]}>
          <p className={styles.step1}>함수</p>
          <ul className={styles["sub-options"]}>
            {function_codes.map(([title, code, input], index) => (
              <li key={index}>
                <button onClick={(e) => updateOption(title, code, input, e)}>{title}</button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
