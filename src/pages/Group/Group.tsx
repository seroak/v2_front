import LoggedInHeader from "../components/LoggedInHeader";
import Room from "./components/Room";
const Group: React.FC = () => {
  return (
    <div className="bg2" style={{ minWidth: "1521px" }}>
      <LoggedInHeader />
      <div className="group-copywriting">
        <div className="s__container">
          <div className="s__row">
            <p>GROUP</p>
            <h2>함께 배우고, 더 빨리 성장하세요!</h2>
            <span>혼자보다 함께할 때 더 많이, 더 빨리 배울 수 있습니다.</span>
          </div>
        </div>
        <img src="/image/img_copywriting.png" alt="그룹이미지" />
      </div>
      <div className="group-data-wrap">
        <div className="group-data-left">
          <div className="user-info">
            <p>김철수님</p>
            <span>kim0000@naver.com</span>
            <ul className="user-group-data">
              <li>
                <p>생성된 그룹 수</p>
                <p>8</p>
              </li>
              <li>
                <p>전체 학생 수</p>
                <p>400</p>
              </li>
            </ul>
            <label htmlFor="addgroup">그룹 생성</label>
            <div>
              <input type="text" id="addgroup" placeholder="그룹 이름" />
              <button>생성</button>
            </div>
          </div>
        </div>
        <div className="group-right">
          <div className="section-title">
            <div className="title-left">
              <h3>그룹</h3>
            </div>
            <div className="title-right">
              <div className="search-wrap">
                <input type="text" placeholder="그룹 검색" />
                <button>
                  <img src="/image/icon_search.svg" alt="검색" />
                </button>
              </div>
            </div>
          </div>
          <ul className="section-data section-data04">
            <Room />
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
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Group;
