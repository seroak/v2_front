const testResponseBody = [
  {
    variables: [
      {
        id: 2,
        expr: "s(a)",
        name: "s",
        code: "def s(a):",
        type: "function",
        idx: null,
      },
    ],
    callStackName: "main",
    type: "assign",
  },
  {
    id: 4,
    depth: 1,
    expr: "1",
    code: "a = 1",
    type: "variable",
  },
  {
    variables: [
      {
        id: 4,
        expr: "1",
        name: "a",
        code: "a = 1",
        type: "variable",
        idx: null,
      },
    ],
    callStackName: "main",
    type: "assign",
  },
  {
    id: 5,
    assignName: "",
    depth: 1,
    signature: "s(a)",
    code: "s(a)",
    type: "callUserFunc",
  },
  {
    args: [
      {
        expr: "1",
        name: "a",
        type: "variable",
      },
    ],
    callStackName: "s",
    code: "s(a)",
    type: "createCallStack",
  },
  {
    id: 3,
    depth: 2,
    expr: "1",
    highlights: [0],
    console: "1\n",
    code: "print(1)",
    type: "print",
  },
  {
    id: 5,
    depth: 1,
    returnExpr: "",
    returnArgName: "",
    code: "s(a)",
    delFuncName: "s",
    type: "endUserFunc",
  },
];

export default testResponseBody;
