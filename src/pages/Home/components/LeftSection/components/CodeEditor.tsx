import { useContext, Fragment } from "react";

import Editor from "@monaco-editor/react";
import { CodeContext } from "../../../Home";

const SplitScreenCodeEditor = () => {
  const context = useContext(CodeContext);
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }
  const { code, setCode } = context;

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Editor
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
          }}
        />
      </div>
    </Fragment>
  );
};

export default SplitScreenCodeEditor;
