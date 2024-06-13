import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "./codeEditor.module.css";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(
    ["def hello_world():", '    print("Hello, World!")'].join("\n")
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(code);
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        // 처리 로직 추가
      } else {
        // todo
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.editorContainer}>
        <form action="#" onSubmit={handleSubmit} className={styles.form}>
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
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Run
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CodeEditor;
