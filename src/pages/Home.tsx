import style from "./home.module.css";
import CodeEditor from "../component/CodeEditor";
import RightSection from "../component/RightSection";
import Resizable from "../component/Resizable";

export default function Home() {
  // For_Box 컴포넌트를 중첩하여 렌더링하는 함수
  // 중첩된 For_Box 컴포넌트를 생성하는 함수

  return (
    <main className={style.main}>
      <h1>Haeya 에디터</h1>
      <Resizable left={<CodeEditor />} right={<RightSection />} />
    </main>
  );
}
