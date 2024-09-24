import { useContext, Fragment, useRef, useEffect, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { CodeContext } from "../../../Visualization";

// Zustand
import { useEditorStore } from "@/store/editor";
import { useConsoleStore } from "@/store/console";

const CodeEditor = () => {
  const context = useContext(CodeContext);
  const [decorationIds, setDecorationIds] = useState<string[]>([]);

  if (!context) {
    console.error("CodeContext not found");
    return null;
  }

  const { code, setCode } = context;
  const highlightLines = useEditorStore((state) => state.highlightLines);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const stepIdx = useConsoleStore((state) => state.stepIdx);
  const errorLine = useEditorStore((state) => state.errorLine);

  useEffect(() => {
    if (editorRef.current) {
      highlightLine(highlightLines[stepIdx]);
    }
  }, [stepIdx, highlightLines]);

  useEffect(() => {
    if (errorLine) {
      displayErrorLine(errorLine);
    }
  }, [errorLine]);

  const displayErrorLine = (errorLine: { lineNumber: number; message: string } | null) => {
    if (!editorRef.current) return;

    const newDecorationIds = editorRef.current.deltaDecorations(decorationIds, [
      {
        range: new monaco.Range(errorLine!.lineNumber, 1, errorLine!.lineNumber, 1),
        options: {
          isWholeLine: true,
          className: "error-Line",
        },
      },
    ]);

    setDecorationIds(newDecorationIds);
  };

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const highlightLine = (lineNumber: number) => {
    if (!editorRef.current) return;

    const newDecorationIds = editorRef.current.deltaDecorations(decorationIds, [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: "myLineHighlight",
        },
      },
    ]);

    setDecorationIds(newDecorationIds);
  };

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
          onMount={handleEditorDidMount}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 16,
          }}
        />
        <style>{`
          .myLineHighlight {
            background-color: #EAECFF;
          }
          .error-Line {
            background-color: #FF0000;
          }
        `}</style>
      </div>
    </Fragment>
  );
};

export default CodeEditor;
