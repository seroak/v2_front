import { useContext, Fragment, useRef, useEffect, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { CodeContext } from "../../../Visualization";
import GptComment from "./GptComment";
// Zustand
import { useEditorStore } from "@/store/editor";
import { useConsoleStore } from "@/store/console";
import { useGptToggleStore } from "@/store/gptToggle";
// 커스텀 훅: 호버 상태 관리
const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event) => {
    setIsHovering(true);
    setHoverPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return { isHovering, hoverPosition, handleMouseEnter, handleMouseLeave };
};

// 호버 컨텐츠 컴포넌트
const HoverContent = ({ children, position }) => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "4px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      {children}
    </div>,
    document.body
  );
};

const CodeEditor = () => {
  const context = useContext(CodeContext);
  const decorationsCollectionRef = useRef<monaco.editor.IEditorDecorationsCollection | null>(null);
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }

  const { code, setCode } = context;
  const highlightLines = useEditorStore((state) => state.highlightLines);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const stepIdx = useConsoleStore((state) => state.stepIdx);
  const errorLine = useEditorStore((state) => state.errorLine);
  const setIsGptToggle = useGptToggleStore((state) => state.setIsGptToggle);
  const { isHovering, hoverPosition, handleMouseEnter, handleMouseLeave } = useHover();
  const [hoverContent, setHoverContent] = useState(null);

  useEffect(() => {
    if (editorRef.current) {
      highlightLine(highlightLines[stepIdx]);
    }
  }, [stepIdx, highlightLines]);

  useEffect(() => {
    if (editorRef.current && errorLine) {
      displayErrorLine(errorLine);
    }
  }, [errorLine]);

  const displayErrorLine = (errorLine: { lineNumber: number; message: string } | null) => {
    if (!editorRef.current || !errorLine) return;

    const editor = editorRef.current;
    const model = editor.getModel();
    if (!model) return;

    const { lineNumber, message } = errorLine;
    const startColumn = 1;
    const endColumn = model.getLineMaxColumn(lineNumber);

    if (!decorationsCollectionRef.current) {
      decorationsCollectionRef.current = editor.createDecorationsCollection();
    }

    decorationsCollectionRef.current.set([
      {
        range: new monaco.Range(lineNumber, startColumn, lineNumber, endColumn),
        options: {
          isWholeLine: true,
          className: "error-line",
          inlineClassName: "red-thick-underline",
          hoverMessage: { value: message },
        },
      },
    ]);
  };

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;

    // 마우스 호버 이벤트 리스너 추가

    editor.onMouseMove((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT) {
        const position = e.target.position;
        if (position) {
          const lineNumber = position.lineNumber;

          // 에러 데코레이션 찾기
          const decorations = editorRef.current?.getModel()?.getAllDecorations() || [];
          const errorDecoration = decorations.find((d) => d.options.className === "error-line");

          // 에러 라인에 마우스가 있을 때
          if (errorDecoration && errorDecoration.range.startLineNumber === lineNumber) {
            console.log("에러라인에 호버", lineNumber);
            setIsGptToggle(true);
          }
          if (errorDecoration && errorDecoration.range.startLineNumber !== lineNumber) {
            console.log("에러라인에서 벗어남", lineNumber);
            setIsGptToggle(false);
          }
        }
      }
    });

    editor.onMouseLeave(() => {
      console.log("완전히  에디터에서 벗어남");
      setIsGptToggle(false);
    });
    // Hover provider 등록 (한 번만 등록)
    monacoInstance.languages.registerHoverProvider("python", {
      provideHover: function (model, position) {
        const range = new monacoInstance.Range(
          position.lineNumber,
          1,
          position.lineNumber,
          model.getLineMaxColumn(position.lineNumber)
        );
        const decorations = model.getDecorationsInRange(range) || [];

        const errorDecoration = decorations.find((d) => d.options.className === "error-line");
        if (errorDecoration) {
          return {
            range: errorDecoration.range,
            contents: [],
          };
        }
      },
    });
  };

  const highlightLine = (lineNumber: number) => {
    if (!editorRef.current) return;

    if (!decorationsCollectionRef.current) {
      decorationsCollectionRef.current = editorRef.current.createDecorationsCollection();
    }

    decorationsCollectionRef.current.set([
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: "myLineHighlight",
        },
      },
    ]);
  };

  return (
    <Fragment>
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Editor
          defaultLanguage="python"
          value={code}
          onMount={handleEditorDidMount}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 16,
          }}
        />
        <style>{`
          .red-thick-underline {
            text-decoration: underline;
            text-decoration-color: red;
            text-decoration-thickness: 3px;
          }
          .error-line {
            background-color: rgba(255, 0, 0, 0.1);
          }
        `}</style>
      </div>
    </Fragment>
  );
};

export default CodeEditor;
