import CodeEditor from "./components/CodeEditor";
import Console from "./components/Console";

const LeftSection = () => {
  return (
    <div style={{ height: "100vh", width: "100%", overflow: "scroll" }}>
      <CodeEditor />
      <Console />
    </div>
  );
};

export default LeftSection;
