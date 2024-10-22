const testResponseBody = [
  {
    variables: [
      {
        id: 2,
        expr: "greet(name, age)",
        name: "greet",
        code: "def greet(name, age):",
        type: "function",
      },
    ],
    callStackName: "main",
    type: "assign",
  },
  {
    id: 5,
    assignName: "a",
    depth: 1,
    signature: "greet(name, age)",
    code: "a = greet(222, 11)",
    type: "callUserFunc",
  },
  {
    args: [
      {
        expr: "222",
        name: "name",
        type: "variable",
      },
      {
        expr: "11",
        name: "age",
        type: "variable",
      },
    ],
    callStackName: "greet",
    code: "a = greet(222, 11)",
    type: "createCallStack",
  },
  {
    id: 3,
    depth: 2,
    returnExpr: "name + age",
    code: "return name + age",
    type: "return",
  },
  {
    id: 3,
    depth: 2,
    returnExpr: "222 + 11",
    code: "return name + age",
    type: "return",
  },
  {
    id: 3,
    depth: 2,
    returnExpr: "233",
    code: "return name + age",
    type: "return",
  },
  {
    id: 5,
    depth: 1,
    returnExpr: "233",
    returnArgName: "a",
    code: "a = greet(222, 11)",
    delFuncName: "greet",
    delFuncId: 2,
    type: "endUserFunc",
  },
  {
    variables: [
      {
        id: 5,
        expr: "233",
        name: "a",
        code: "a = greet(222, 11)",
        type: "variable",
      },
    ],
    callStackName: "main",
    type: "assign",
  },
  {
    id: 6,
    depth: 1,
    expr: "a",
    highlights: [0],
    console: null,
    code: "print(a)",
    type: "print",
  },
  {
    id: 6,
    depth: 1,
    expr: "233",
    highlights: [0, 1, 2],
    console: "233\n",
    code: "print(a)",
    type: "print",
  },
];

export default testResponseBody;
