import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "./codeEditor.module.css";
import { useMutation } from "@tanstack/react-query";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(
    ["def hello_world():", '    print("Hello, World!")'].join("\n")
  );

  const mutation = useMutation({
    mutationFn: async (code) => {
      const response = await fetch("http://localhost:8000/api/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      return result;
    },
    onError: (error) => {
      console.error("Error:", error); // 오류 발생 시 콘솔에 출력
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(code, {
      onSuccess: (data) => {
        console.log("Success:", data); // 성공 시 콘솔에 출력
      },
      onError: (error) => {
        console.error("Submit Error:", error); // 제출 오류 시 콘솔에 출력
      },
    });
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
