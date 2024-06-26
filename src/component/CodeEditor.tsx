import React, { useState, useContext } from "react";
import Editor from "@monaco-editor/react";
import styles from "./codeEditor.module.css";
import { useMutation } from "@tanstack/react-query";
import { CodeContext } from "../pages/Home";
const CodeEditor: React.FC = () => {
  // context API로 state 가져오기
  const context = useContext(CodeContext);
  // context가 없을 경우 에러 출력 패턴 처리안해주면 에러 발생
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }
  const { code, setCode } = context;

  return (
    <div className={styles.container}>
      <div className={styles.editorContainer}>
        <div className={styles.form}>
          <div className={styles.editorWrapper}>
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
              className={styles.editor}
              defaultLanguage="python"
              value={code}
              onChange={(value) => setCode(value || "")}
            />
          </div>
          <div className={styles.buttonContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
