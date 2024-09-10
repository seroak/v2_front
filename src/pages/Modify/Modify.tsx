import LoggedInHeader from "../components/LoggedInHeader";
const Modify = () => {
  return (
    <div className="bg">
      <LoggedInHeader />
      <div id="header02" className="bg-blue"></div>
      <div className="group-wrap">
        <div className="group-left">
          <img src="/image/icon_group.svg" alt="그룹" />
          <h2 className="group-title">파이썬 기초 1반</h2>
        </div>
        <div className="group-link">
          <p className="link-name">
            <img src="/image/icon_link.svg" alt="링크" />
            그룹 초대 링크
          </p>
          <p className="link-data">https://www.google.com/webhp?hl=ko&sa=</p>
          <button>
            <img src="/image/icon_copy.svg" alt="복사하기" />
          </button>
        </div>
      </div>
      <div className="s__container">
        <div className="modify-s__row">
          <div className="section-title">
            <div className="title-left">
              <h3>초대 대기</h3>
            </div>
          </div>
          <ul className="section-data section-data03">
            <li>
              <div className="data03-name">
                <p>홍길동</p>
                <span>hong@naver.com</span>
                <span>학번 : 20003204</span>
              </div>
              <div className="data03-btns">
                <button className="blue">추가</button>
                <button className="red">거절</button>
              </div>
            </li>
            <li>
              <div className="data03-name">
                <p>홍길동</p>
                <span>hong@naver.com</span>
                <span>학번 : 20003204</span>
              </div>
              <div className="data03-btns">
                <button className="blue">추가</button>
                <button className="red">거절</button>
              </div>
            </li>
          </ul>
          <div className="section-title">
            <div className="title-left">
              <h3>가입된 학생</h3>
            </div>
            <div className="title-right">
              <div className="search-wrap">
                <input type="text" placeholder=" 학생 검색" />
                <button>
                  <img src="/image/icon_search.svg" alt="검색" />
                </button>
              </div>
            </div>
          </div>
          <ul className="section-data section-data03">
            <li>
              <div className="data03-name">
                <p>홍길동</p>
                <span>hong@naver.com</span>
                <span>학번 : 20003204</span>
              </div>
              <div className="data03-btns">
                <button className="red">방출</button>
              </div>
            </li>
            <li>
              <div className="data03-name">
                <p>홍길동</p>
                <span>hong@naver.com</span>
                <span>학번 : 20003204</span>
              </div>
              <div className="data03-btns">
                <button className="red">방출</button>
              </div>
            </li>
            <li>
              <div className="data03-name">
                <p>홍길동</p>
                <span>hong@naver.com</span>
                <span>학번 : 20003204</span>
              </div>
              <div className="data03-btns">
                <button className="red">방출</button>
              </div>
            </li>
            <li>
              <div className="data03-name">
                <p>홍길동</p>
                <span>hong@naver.com</span>
                <span>학번 : 20003204</span>
              </div>
              <div className="data03-btns">
                <button className="red">방출</button>
              </div>
            </li>
          </ul>
          <div className="right-btns">
            <button className="red">
              <img src="/image/icon_delete.svg" alt="그룹삭제" />
              그룹삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modify;
