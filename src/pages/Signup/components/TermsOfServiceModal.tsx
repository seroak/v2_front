import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: any;
}
const TermsOfServiceModal = ({ isOpen, onClose }: Props) => {
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
    <div id="popupModal01" className="popup__section is-open" onClick={onClose}>
      <div className="popup__dim"></div>
      <div className="is-open popup__inner">
        <div className="popup__container__group --popup" onClick={(e) => e.stopPropagation()}>
          <div className="popup__header__group">
            <h1 className="popup__header__title">edupi 이용약관</h1>
            <button className="popup__header__close" onClick={onClose}>
              <span className="screen-out">닫기</span>
            </button>
          </div>
          <div className="popup__contents__group">
            <p>
              <h2 className="popup__header__title">제 1 조 (목적)</h2><br />
              이 약관은 edupi(이하 "회사")가 제공하는 코딩 교육 플랫폼 edupi(이하 "서비스")의 이용 조건 및 절차, 회원과 비회원의 권리 및 의무, 기타 필요한 사항을 규정함을 목적으로
              합니다.<br />
              본 서비스는 교사와 학생이 사용하는 플랫폼으로, 교사는 학생들의 학습 정보를 열람하고 관리할 수 있습니다.<br />
              <br />
              <h2 className="popup__header__title">제 2 조 (정의)</h2><br />
              1. "서비스"라 함은 회사가 제공하는 코딩 교육 플랫폼 및 관련 온라인 서비스를 의미합니다.<br />
              2. "회원"이라 함은 회사가 정한 절차에 따라 회원가입을 하고, 서비스를 지속적으로 이용할 수 있는 자를 의미합니다.<br />
              3. "비회원"이라 함은 회원가입을 하지 않고, 제한된 서비스만을 이용하는 자를 의미합니다.<br />
              4. "교사"라 함은 학생의 학습 상황을 확인하고 관리할 수 있는 권한을 가진 회원을 의미합니다.<br />
              5. "학생"이라 함은 교사와 연결되어 학습 활동을 진행하며, 학습 기록이 관리되는 회원을 의미합니다.<br />
              6. "이용자"란 회사의 서비스에 접속하여 이 약관에 따라 제공되는 서비스를 받는 회원 및 비회원을 통칭합니다.<br />
              <br />
              <h2 className="popup__header__title">제 3 조 (이용약관의 효력 및 변경)</h2><br />
              1. 이 약관은 서비스를 이용하고자 하는 모든 이용자가 동의함으로써 효력이 발생합니다.<br />
              2. 회사는 필요에 따라 관련 법령을 위반하지 않는 범위 내에서 약관을 변경할 수 있습니다.<br />
              3. 변경된 약관은 회사의 공지사항을 통해 회원 및 비회원에게 공지되며, 공지된 날로부터 7일 후에 그 효력이 발생합니다.<br />
              4. 회원이 변경된 약관에 동의하지 않을 경우, 회원 탈퇴를 요청할 수 있습니다.<br />
              <br />
              <h2 className="popup__header__title">제 4 조 (회원가입 및 계정 관리)</h2><br />
              1. 회원가입은 이용자가 회사가 제공하는 양식에 따라 필수 정보를 기입하고 약관에 동의함으로써 이루어집니다.<br />
              2. 교사와 학생은 각각 별도의 회원가입 절차를 통해 계정을 생성하며, 교사는 학생의 학습 정보를 관리할 수 있는 권한을 부여받습니다.<br />
              3. 회원은 정확한 정보를 기입해야 하며, 허위 정보를 기입한 경우 법적인 보호를 받을 수 없습니다.<br />
              4. 회원은 언제든지 자신의 개인정보를 열람하고 수정할 수 있으며, 가입 신청 시 제공한 정보에 변경 사항이 있을 경우 즉시 수정해야 합니다.<br />
              5. 회사는 아래의 경우 회원가입 신청을 거부하거나 사후에 회원 자격을 박탈할 수 있습니다.<br />
              &emsp;&emsp;- 타인의 명의를 도용하거나 허위 정보를 제공한 경우<br />
              &emsp;&emsp;- 기타 회사의 운영에 심각한 지장을 초래하는 행위를 한 경우<br />
              <br />
              <h2 className="popup__header__title">제 5 조 (회원과 비회원의 서비스 이용)</h2><br />
              1. 회원은 basic, primieum으로 나누어 기능을 제한적으로 제공될 수 있습니다. 교사 회원은 학생의 학습 기록을 열람하고 관리할 수 있으며, 학생 회원은 교사가 제공하는 학습
              자료를 통해 학습할 수 있습니다.<br />
              2. 비회원은 회사가 정한 범위 내에서 제한된 서비스만을 이용할 수 있으며, 일부 기능은 회원가입을 해야만 이용 가능합니다.<br />
              3. 회원은 본인의 계정 정보 및 비밀번호를 안전하게 관리해야 하며, 본인의 과실로 인한 피해에 대해 회사는 책임을 지지 않습니다.<br />
              4. 비회원은 회원 가입을 하지 않아 발생하는 서비스 이용 제한에 대해 이의를 제기할 수 없습니다.<br />
              <br />
              <h2 className="popup__header__title">제 6 조 (회원 탈퇴 및 자격 상실)</h2><br />
              1. 회원은 언제든지 회사에 탈퇴를 요청할 수 있으며, 탈퇴 시 회사는 관련 법령에 따라 회원의 정보를 처리합니다.<br />
              2. 회사는 회원이 다음 각 호에 해당하는 경우 회원 자격을 제한하거나 상실시킬 수 있습니다.<br />
              &emsp;&emsp;- 회원가입 신청 시 허위 내용을 기재한 경우<br />
              &emsp;&emsp;- 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우<br />
              &emsp;&emsp;- 기타 약관 및 관련 법령을 위반한 경우<br />
              <br />
              <h2 className="popup__header__title">제 7 조 (개인정보 보호)</h2><br />
              1. 회사는 이용자의 개인정보를 보호하기 위해 노력하며, 개인정보 처리방침을 따릅니다.<br />
              2. 회원과 비회원은 서비스를 이용하면서 제공한 개인정보의 보호와 관련된 권리를 행사할 수 있습니다.<br />
              <br />

              <h2 className="popup__header__title">제 8 조 (기타)</h2><br />
              1. 이 약관에 명시되지 않은 사항은 관련 법령 또는 상관례에 따릅니다.<br />
              2. 회사는 서비스와 관련하여 필요한 추가 규정을 제정할 수 있으며, 이는 약관의 일부로 간주됩니다.<br />
              <br />
              <br />

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TermsOfServiceModal;
