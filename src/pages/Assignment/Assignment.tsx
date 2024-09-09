import LoggedInHeader from "../components/LoggedInHeader";
import AssginmentSection from "./components/AssignmentSection";
const Assignment = () => {
  return (
    <div className="bg">
      <LoggedInHeader />
      <div className="group-wrap">
        <div className="group-left">
          <img src="/image/icon_group.svg" alt="그룹" />
          <h2 className="group-title">파이썬 기초 1반</h2>
        </div>
      </div>
      <div className="s__container">
        <div className="s__row">
          <div className="section-title">
            <div className="title-left">
              <h3>과제</h3>
            </div>
            <div className="title-right">
              <select name="" id="" className="s__select">
                <option value="1">등록순</option>
                <option value="2">마감순</option>
                <option value="3">이름순</option>
              </select>
              <button>과제생성</button>
            </div>
          </div>
          <ul className="section-data section-data02">
            <li className="timeover">
              <a href="">
                <div className="section-data02-img-wrap">
                  <img src="/image/img_data02_test01.png " alt="" />
                </div>
                <div className="data02-name">
                  <p>피보나치수열</p>
                  <div>
                    <p>제출시작</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                  <div>
                    <p>제출마감</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="section-data02-img-wrap">
                  <img src="/image/img_data02_test02.png " alt="" />
                </div>
                <div className="data02-name">
                  <p>구구단 출력</p>
                  <div>
                    <p>제출시작</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                  <div>
                    <p>제출마감</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="section-data02-img-wrap">
                  <img src="/image/img_data02_test03.png " alt="" />
                </div>
                <div className="data02-name">
                  <p>별찍기 3</p>
                  <div>
                    <p>제출시작</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                  <div>
                    <p>제출마감</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="section-data02-img-wrap">
                  <img src="/image/img_data02_nodata.png " alt="" />
                </div>
                <div className="data02-name">
                  <p>사용자 입력</p>
                  <div>
                    <p>제출시작</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                  <div>
                    <p>제출마감</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div className="section-data02-img-wrap">
                  <img src="/image/img_data02_nodata.png " alt="" />
                </div>
                <div className="data02-name">
                  <p>사용자 입력</p>
                  <div>
                    <p>제출시작</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                  <div>
                    <p>제출마감</p>
                    <p>2023.01.01 11:59</p>
                  </div>
                </div>
              </a>
            </li>
            <AssginmentSection />
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Assignment;
