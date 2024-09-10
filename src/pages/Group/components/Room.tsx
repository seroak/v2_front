import { ReactNode } from "react";

const Room = (): ReactNode => {
  return (
    <li>
      <a href="">
        <div className="data04-name">
          <p>파이썬 기초 1반</p>
          <span>인원 : 23명</span>
          <span>초대 대기 : 1명</span>
        </div>
        <img src="/image/icon_right_arrow2.svg" alt="" />
      </a>
    </li>
  );
};
export default Room;
