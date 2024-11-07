import styles from "../LeftSection.module.css";
import { useEffect, useRef, useState, useContext } from "react";
import { CodeContext } from "@/pages/Visualization/context/CodeContext";
import {basic_codes, function_codes} from "./exampleCode.ts"
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("옵션을 선택해주세요.");
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

  const updateOption = (optionText: string, code: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedOption(optionText);
    setCode(code);
    setIsOpen(false);
  };

  return (
    <div className={styles["select-box"]} ref={dropdownRef}>
      <div
        className={`${styles["default-option"]} ${
          selectedOption !== "옵션을 선택해주세요." ? styles["is_selected"] : ""
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
            {basic_codes.map( ([title, code]) => (
              <li>
                <button  onClick={(e) => updateOption(title, code, e)}>
                  {title}
                </button>
              </li>

            ))}

            {/*<li>*/}
            {/*  <button onClick={(e) => updateOption("옵션 1-1", test, e)}>옵션 1-1</button>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <button onClick={(e) => updateOption("옵션 1-2", "print(2)", e)}>옵션 1-2</button>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <button onClick={(e) => updateOption("옵션 1-3", "print(2)", e)}>옵션 1-3</button>*/}
            {/*</li>*/}
          </ul>
        </li>
        <li className={styles["main-option"]}>
          <p className={styles.step1}>함수</p>
          <ul className={styles["sub-options"]}>
            {function_codes.map( ([title, code]) => (
                <li>
                  <button onClick={(e) => updateOption(title, code, e)}>
                    {title}
                  </button>
                </li>
            ))}
          </ul>
        </li>
        <li className={`${styles["main-option"]} ${styles["no-sub"]}`}>
          <button className={styles.step1} onClick={(e) => updateOption("옵션 3", "print(2)", e)}>
            옵션 3
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
