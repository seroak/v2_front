import { useEffect } from "react";

import styles from "./ClassroomModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  email: string;
  code: string;
}
const ConsentInformationModal = ({ isOpen, onClose, userName, email, code }: Props) => {

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body에 class를 추가합니다.
      document.body.classList.add("scroll-off");
    } else {
      // 모달이 닫힐 때 body에서 class를 제거합니다.
      document.body.classList.remove("scroll-off");
    }

    // 컴포넌트가 언마운트될 때 class를 제거합니다.
    return () => {
      document.body.classList.remove("scroll-off");
    };
  }, [isOpen]);

  // if (!isOpen) return null;
  return (
    <div id="popupModal02" className="popup__section is-open" onClick={onClose}>
      <div className="popup__dim"></div>
      <div className="popup__inner is-open">
        <div className="popup__container__group" onClick={(e) => e.stopPropagation()}>
          <div className="popup__header__group">
            <h2 className="popup__header__title">
              {userName} ({email})
            </h2>
            <button className="popup__header__close" onClick={onClose}>
              <span className="screen-out">닫기</span>
            </button>
          </div>
          <div className={styles["popup__contents__group"]}>
            <div className={styles["popup__content__title"]}>제출 코드</div>
            <pre className={styles["popup__display__code"]}>
              {code.split('\n').map((line, index) => (
                <code key={index} className={styles["code__line"]}>
                  <span className={styles["line__number"]}>{index + 1}</span>
                  <span className={styles["line__content"]}>{line}</span>
                </code>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConsentInformationModal;
