import { Fragment } from "react/jsx-runtime";
import styles from "./LeftSection.module.css";
import CodeEditor from "./components/CodeEditor";
import Console from "./components/Console";
import Split from "react-split";

import Dropdown from "./components/Dropdown";

const LeftSection = () => {
  return (
    <Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles["top-bar"]}>
          <p className={styles["view-section-title"]}>코드작성</p>
          <div className="flex items-center gap-4">
            <button type="button" className={styles["playcode-btn"]}>
              <img src="/image/icon_play_w.svg" alt="" />
              실행코드
            </button>
            <Dropdown />
          </div>
        </div>

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
          style={{ display: "flex", flexDirection: "column", height: "94.5%" }}
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
