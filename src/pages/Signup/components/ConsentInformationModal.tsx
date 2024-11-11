import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const ConsentInformationModal = ({ isOpen, onClose }: Props) => {
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
      <div className="is-open popup__inner">
        <div className="popup__container__group --popup popup02-margin-bottom" onClick={(e) => e.stopPropagation()}>
          <div className="popup__header__group">
            <h2 className="popup__header__title">개인정보 수집 및 이용에 관한 동의</h2>
            <button className="popup__header__close" onClick={onClose}>
              <span className="screen-out">닫기</span>
            </button>
          </div>
          <div className="popup__contents__group">
            <p>
              <h2 className="popup__header__title">제 1조 (개인정보의 처리 목적)</h2><br /><br />
              1.(공통) 회사는 개인 정보를 다음의 목적을 위하여 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
              용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
              받는 등 필요한 조치를 이행할 예정입니다.<br />
              &emsp;&emsp;- 서비스 회원 가입의사 확인, 회원 식별, 회원자격 유지 및 관리, 서비스 부정이용 방지<br />
              &emsp;&emsp;- 만 14세 미만 아동의 개인정보 수집·처리시 법정대리인의 동의여부 확인, 법정 대리인 권리행사 시 <br />&emsp;&emsp;&ensp;본인 확인<br />
              &emsp;&emsp;- 재화 또는 서비스 제공, 물품 배송, 청구서, 계약서 등의 전송 및 배송<br />
              &emsp;&emsp;- 요금 결제·정산, 본인인증, 환불 처리<br />
              &emsp;&emsp;- 고용보험 환급 교육과정에 대한 수강정보 등록 및 환급서류 제출 용도<br />
              &emsp;&emsp;- 문의사항 또는 고충처리, 공지사항 기타 각종 통지<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConsentInformationModal;
