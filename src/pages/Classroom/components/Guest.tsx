interface GuestType {
  guestId: number;
  name: string;
  status: number | string;
}
interface props {
  guest: GuestType;
}
const Guest = ({ guest }: props) => {
  switch (guest.status) {
    case 0:
      guest.status = "제출 중";
      break;
    case 1:
      guest.status = "제출 완료";
      break;
    case 2:
      guest.status = "도움";
      break;
    default:
      null;
  }
  return (
    <>
      <li>
        <a href="#">
          <div>
            <p>{guest.name}</p>
            <span>제출시간 14:02</span>
          </div>
          <div className="progress-success">
            <p>{guest.status}</p>
          </div>
        </a>
      </li>
    </>
  );
};
export default Guest;
