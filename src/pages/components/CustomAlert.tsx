import React, { useState, useCallback } from "react";
import styles from "./CustomAlert.module.css";

interface AlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

// 컴포넌트를 훅 외부로 분리하고 React.memo로 감싸기
const AlertComponent = React.memo(({ isOpen, message, onClose }: AlertProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles["alert-overlay"]}>
      <div className={styles["alert-container"]}>
        <div className={styles["alert-content"]}>
          <div className={styles["icon-wrapper"]}>
            <img src="/image/img_logo2.png" alt="logo" className={styles["logo-image"]} />
          </div>
          <p className="message">{message}</p>
          <button onClick={onClose} className={styles["ok-button"]}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
});

AlertComponent.displayName = "AlertComponent";

interface UseCustomAlertReturn {
  isOpen: boolean;
  openAlert: (message: string) => void;
  closeAlert: () => void;
  CustomAlert: React.FC;
}

export const useCustomAlert = (): UseCustomAlertReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const openAlert = useCallback((message: string) => {
    setAlertMessage(message);
    setIsOpen(true);
  }, []);

  const closeAlert = useCallback(() => {
    setIsOpen(false);
    setAlertMessage("");
  }, []);

  // 메모이제이션된 컴포넌트를 반환하는 함수
  const CustomAlert = useCallback(() => {
    return <AlertComponent isOpen={isOpen} message={alertMessage} onClose={closeAlert} />;
  }, [isOpen, alertMessage, closeAlert]);

  return { isOpen, openAlert, closeAlert, CustomAlert };
};
