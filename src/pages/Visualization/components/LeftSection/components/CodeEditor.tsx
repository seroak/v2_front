import { useContext, Fragment, useRef, useEffect, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { CodeContext } from "../../../Visualization";
// Zustand
import { useEditorStore } from "@/store/editor";
import { useConsoleStore } from "@/store/console";
import { useGptTooltipStore } from "@/store/gptTooltip";
import { useTimeoutStore } from "@/store/timeout";
const CodeEditor = () => {
  const context = useContext(CodeContext);
  const decorationsCollectionRef = useRef<monaco.editor.IEditorDecorationsCollection | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  if (!context) {
    console.error("CodeContext not found");
    return null;
  }

  const { code, setCode } = context;
  const highlightLines = useEditorStore((state) => state.highlightLines);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const stepIdx = useConsoleStore((state) => state.stepIdx);
  const errorLine = useEditorStore((state) => state.errorLine);
  const setIsGptToggle = useGptTooltipStore((state) => state.setIsGptToggle);
  const { setGptTop, setGptLeft } = useGptTooltipStore();
  const { setTimeoutId, clearCurrentTimeout } = useTimeoutStore();
  const timeoutRef = useRef<number | null>(null);
  // 컴포넌트가 언마운트될 때 timeout 정리
  useEffect(() => {
    return () => {
      clearCurrentTimeout();
    };
  }, [clearCurrentTimeout]);

  useEffect(() => {
    if (editorRef.current) {
      highlightLine(highlightLines[stepIdx]);
    }
  }, [stepIdx, highlightLines]);

  useEffect(() => {
    if (editorRef.current && errorLine) {
      displayErrorLine(errorLine);
      handleEditorDidMount(editorRef.current, monaco);
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
    setIsEditorReady(true);

    editor.onMouseMove((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT) {
        const position = e.target.position;
        if (position && errorLine) {
          const lineNumber = position.lineNumber;
          if (lineNumber === errorLine.lineNumber) {
            const errorLineCoords = editor.getScrolledVisiblePosition({
              lineNumber: errorLine.lineNumber,
              column: 1,
            });

            const editorDomNode = editor.getDomNode();
            if (editorDomNode && errorLineCoords) {
              const editorCoords = editorDomNode.getBoundingClientRect();

              const globalLeft = editorCoords.left + errorLineCoords.left;
              const globalTop = editorCoords.top + errorLineCoords.top;

              const lineHeight = editor.getOption(monacoInstance.editor.EditorOption.lineHeight);

              setGptLeft(globalLeft);
              setGptTop(globalTop + lineHeight);
            }
          }

          const decorations = editor.getModel()?.getAllDecorations() || [];
          const errorDecoration = decorations.find((d) => d.options.className === "error-line");

          if (errorDecoration && errorDecoration.range.startLineNumber === lineNumber) {
            clearCurrentTimeout();
            setIsGptToggle(true);
          } else if (errorDecoration && errorDecoration.range.startLineNumber !== lineNumber) {
            clearCurrentTimeout();
            timeoutRef.current = window.setTimeout(() => {
              setIsGptToggle(false);
              setTimeoutId(null);
            }, 300);
            setTimeoutId(timeoutRef.current);
          }
        }
      }
    });

    editor.onMouseLeave(() => {
      clearCurrentTimeout();
      console.log("완전히  에디터에서 벗어남");
      timeoutRef.current = window.setTimeout(() => {
        setIsGptToggle(false);
        setTimeoutId(null);
      }, 300);
      setTimeoutId(timeoutRef.current);
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
