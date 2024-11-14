import { Link } from "react-router-dom";
interface ClassData {
  id: number;
  name: string;
  totalPeople: number;
}
interface props {
  classData: ClassData;
}
const GuestRoom = ({ classData }: props) => {
  return (
    <li>
      <Link to={`/classroomdashboard/classroom/viz/${classData.id}`}>
        <div className="data04-name">
          <p>{classData.name}</p>
          <span>인원 : {classData.totalPeople}명</span>
        </div>
        <img src="/image/icon_right_arrow2.svg" alt="" />
      </Link>
    </li>
  );
};
export default GuestRoom;
