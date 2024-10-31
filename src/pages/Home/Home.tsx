import PublicHeader from "../components/PublicHeader";
import LoggedInHeader from "../components/LoggedInHeader";
import { useUserStore } from "@/store/user";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Home.module.css";
import gsap from "gsap";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const userName = useUserStore((state) => state.userName);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>("section");
    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <>
      <body>
        {userName === "" ? <PublicHeader /> : <LoggedInHeader />}
        <section className={styles["main01"]}>
          <div className={styles["main-bg-top"]}></div>
          <img src="/image/img_logo_w.png" alt="" />
          <h2>파이썬 공부를 더욱 쉽게!</h2>
          <p>edupi와 함께 파이썬 공부를 쉽고 재밌게 하세요.</p>
          <Link className={styles["btn_cta"]} to="/viz">
            <p>무료로 시작하기</p>
          </Link>
          <img className={styles["down-arrow"]} src="/image/icon_down_arrow_w.svg" alt="" />
          <div className={styles["main-bg-bottom"]}></div>
        </section>
        <section className={styles["main02"]}>
          <div className={styles["main-container"]}>
            <div className={styles["main-row"]}>
              <div className={styles["main-contents"]}>
                <h2>코드 시각화</h2>
                <p>작성한 코드를 시각화해서 보세요.</p>
                <Link to="/viz">코드 시각화 하기</Link>
              </div>
              <div className={styles["sec02-bg"]}>
                <div className={styles["video-container"]}>
                  <video width="530px" height="293px" autoPlay loop muted>
                    <source src="/image/visualize.mov" type="video/webm" />
                    <p>이 브라우저는 video 요소를 지원하지 않습니다.</p>
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["main03"]}>
          <div className={styles["main-container"]}>
            <div className={styles["main-row"]}>
              <img className={styles["pc-only"]} src="/image/img_main_sec03.png" alt="코드 교정 및 힌트 이미지" />
              <img className={styles["mobile-only"]} src="/image/img_main_sec03_m.png" alt="코드 교정 및 힌트 이미지" />

              <div className={styles["main-contents"]}>
                <h2>코드 교정 및 힌트</h2>
                <p>틀린 코드를 바로 교정해보세요.</p>
                <Link to="/viz">코드 교정 하기</Link>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["main04"]}>
          <div className={styles["main-container"]}>
            <div className={styles["main-row"]}>
              <div className={styles["main-contents"]}>
                <h2>코딩 교육 플랫폼</h2>
                <p>
                  쉽게 그룹을 관리하고
                  <br />
                  학생들의 진척도를 실시간으로 확인할 수 있는 기능을 사용해보세요
                </p>
                <img src="/image/img_main_sec04_2.png" alt="과제기능 효과" />
              </div>
              <img className={styles["pc-only"]} src="/image/img_main_sec04.png" alt="코딩 교육 플랫폼 이미지" />
              <img className={styles["mobile-only"]} src="/image/img_main_sec04_m.png" alt="코딩 교육 플랫폼 이미지" />
            </div>
          </div>
        </section>
        <section className={styles["main05"]}>
          <div className={styles["main-bg-top"]}></div>

          <h2>
            코딩 교육의 시작,
            <br className={styles["mobile-only"]} />
            에듀파이와 함께하세요!
          </h2>
          <p>edupi와 함께 파이썬 공부를 쉽고 재밌게 하세요.</p>
          <Link className={styles["btn_cta"]} to="/viz">
            <p>무료로 시작하기</p>
          </Link>
          <div className={styles["main-bg-bottom"]}></div>
        </section>
        <footer>
          <p>© Copyright 2024. edupi. All Rights Reserved.</p>
        </footer>
      </body>
    </>
  );
};
export default Home;
