import { Fragment } from "react/jsx-runtime";
import styles from "./LeftSection.module.css";
import CodeEditor from "./components/CodeEditor";
import Console from "./components/Console";
import Split from "react-split";
const LeftSection = () => {
  return (
    <Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p className={styles["view-section-title"]}>코드작성</p>
        <Split
          sizes={[70, 30]}
          minSize={100}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="vertical"
          cursor="row-resize"
          style={{ display: "flex", flexDirection: "column", height: "82vh" }}
          className={styles.splitContainer}
        >
          <CodeEditor />
          <Console />
        </Split>
      </div>
    </Fragment>
  );
};

export default LeftSection;
