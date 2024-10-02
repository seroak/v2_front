interface GuestType {
  id: number;
  email: string;
  name: string;
  status: number | string;
  role: number;
}
interface props {
  guest: GuestType;
}
const Guest = ({ guest }: props) => {
  switch (guest.status) {
    case 1:
      guest.status = "제출 중";
      break;
    case 2:
      guest.status = "도움 요청";
      break;
    case 3:
      guest.status = "제출 완료";
      break;
    default:
      null;
  }
  return (
    <>
      <li>
        <a href="#">
          {guest.status === "제출 중" ? (
            <>
              <div>
                <p>{guest.name}</p>
              </div>
              <div className="progress-not">
                <p>{guest.status}</p>
              </div>
            </>
          ) : null}
          {guest.status === "도움 요청" ? (
            <>
              <div>
                <p>{guest.name}</p>
              </div>
              <div className="progress-fail">
                <p>{guest.status}</p>
              </div>
            </>
          ) : null}
          {guest.status === "제출 완료" ? (
            <>
              <div>
                <p>{guest.name}</p>
              </div>
              <div className="progress-success">
                <p>{guest.status}</p>
              </div>
            </>
          ) : null}
        </a>
      </li>
    </>
  );
};
export default Guest;
