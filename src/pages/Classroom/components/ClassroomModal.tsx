import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentCode } from "@/services/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styles from "./ClassroomModal.module.css";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  guest: {
    id: number;
    email: string;
    name: string;
    status: number;
    role: number;
  };
}
interface studentCodeType {
  code: string;
  detail: string;
  result: string;
}

const ClassroomModal = ({ isOpen, onClose, guest }: Props) => {
  const { data: studentCode, isLoading } = useQuery<studentCodeType>({
    queryKey: ["studentData", guest],
    queryFn: () => getStudentCode(guest.id),
  });

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

  if (!isOpen) return null;
  return (
    <div id="popupModal02" className="popup__section is-open" onClick={onClose}>
      <div className="popup__dim"></div>
      <div className="popup__inner is-open">
        <div className="popup__container__group" onClick={(e) => e.stopPropagation()}>
          <div className="popup__header__group">
            <h2 className="popup__header__title">
              {guest?.name} ({guest?.email})
            </h2>
            <button className="popup__header__close" onClick={onClose}></button>
          </div>
          <div className={styles["popup__contents__group"]}>
            <div className={styles["popup__content__title"]}>제출 코드</div>
            {isLoading ? (
              <div>로딩중...</div>
            ) : Object.keys(studentCode?.result!).length !== 0? (
              <pre className="highlighted-code">
                {studentCode?.result.split("\n").map((line, index) => (
                  <code key={index} className={styles["code__line"]}>
                    <span className={styles["line__number"]}>{index + 1}</span>
                    <SyntaxHighlighter key={`code-${index}-${line}`} language={"python"} style={oneLight}>
                      {line}
                    </SyntaxHighlighter>
                  </code>
                ))}
              </pre>
            ) : (
              <pre className="highlighted-code">
                  <code key={0} className={styles["code__line"]}>
                    <span className={styles["line__number"]}>{1}</span>
                    <SyntaxHighlighter key={`code-${1}`} language={"python"} style={oneLight}>
                      코드가 없습니다.
                    </SyntaxHighlighter>
                  </code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClassroomModal;
