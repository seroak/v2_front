// CustomAlert.tsx
import React, { useState } from "react";
import styles from "./CustomAlert.module.css";
interface UseCustomAlertReturn {
  isOpen: boolean;
  openAlert: (message: string) => void; // message 파라미터 추가
  closeAlert: () => void;
  CustomAlert: React.FC;
}

export const useCustomAlert = (): UseCustomAlertReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // openAlert에 메시지를 파라미터로 받도록 수정
  const openAlert = (message: string) => {
    setAlertMessage(message);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
    setAlertMessage("");
  };

  const CustomAlert = () => {
    if (!isOpen) return null;

    return (
      <div className={styles["alert-overlay"]}>
        <div className={styles["alert-container"]}>
          <div className={styles["alert-content"]}>
            <div className={styles["icon-wrapper"]}>
              <img src="/image/img_logo2.png" alt="logo" className={styles["logo-image"]} />
            </div>
            <p className="message">{alertMessage}</p>
            <button onClick={closeAlert} className={styles["ok-button"]}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

  return { isOpen, openAlert, closeAlert, CustomAlert };
};
