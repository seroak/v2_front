import { GuestType } from "../Classroom";
interface GuestProps {
  guest: GuestType;
  onClick: () => void;
}
const Guest = ({ guest, onClick }: GuestProps) => {
  let guestStatus = "";
  switch (guest.status) {
    case 1:
      guestStatus = "미제출";
      break;
    case 2:
      guestStatus = "도움 요청";
      break;
    case 3:
      guestStatus = "제출 완료";
      break;
    default:
      null;
  }
  return (
    <>
      <li onClick={onClick}>
        <a style={{ cursor: "pointer" }}>
          {guestStatus === "미제출" ? (
            <>
              <div>
                <p>{guest.name}</p>
              </div>
              <div className="progress-not">
                <p>{guestStatus}</p>
              </div>
            </>
          ) : null}
          {guestStatus === "도움 요청" ? (
            <>
              <div>
                <p>{guest.name}</p>
              </div>
              <div className="progress-fail">
                <p>{guestStatus}</p>
              </div>
            </>
          ) : null}
          {guestStatus === "제출 완료" ? (
            <>
              <div>
                <p>{guest.name}</p>
              </div>
              <div className="progress-success">
                <p>{guestStatus}</p>
              </div>
            </>
          ) : null}
        </a>
      </li>
    </>
  );
};
export default Guest;
