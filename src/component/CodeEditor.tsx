import React, { useState, useContext } from "react";
import Editor from "@monaco-editor/react";
import styles from "./codeEditor.module.css";
import { useMutation } from "@tanstack/react-query";
import { CodeContext } from "../pages/Home";
const CodeEditor: React.FC = () => {
  //todo 이상없이 수정되면 삭제될 코드
  // const [code, setCode] = useState<string>(
  //   ["def hello_world():", '    print("Hello, World!")'].join("\n")
  // );

  // context API로 state 가져오기
  const context = useContext(CodeContext);
  // context가 없을 경우 에러 출력 패턴 처리안해주면 에러 발생
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }
  const { code, setCode } = context;
  const mutation = useMutation({
    mutationFn: async (code) => {
      const response = await fetch("http://localhost:8000/v1/python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source_code: code }),
      });
      return await response.json();
      // return result;
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(code, {
      onSuccess: (data) => {
        setCode(data);
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
          <div className={styles.buttonContainer}>
            {/* <button type="submit" className={styles.button}>
              Run
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
