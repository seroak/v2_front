interface GuestType {
  guestId: number;
  name: string;
  email: string;
  status: number | string;
}
interface props {
  guest: GuestType;
}
const Guest = ({ guest }: props) => {
  return (
    <li>
      <div className="data03-name">
        <p>{guest.name}</p>
        <span>{guest.email}</span>
      </div>
      <div className="data03-btns">
        <button className="red">방출</button>
      </div>
    </li>
  );
};
export default Guest;
