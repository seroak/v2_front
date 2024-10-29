const appendResponseBody = [
  {
    id: 2,
    depth: 1,
    expr: "[1, 2, 3, 4]",
    code: "a = [1,2,3,4]",
    type: "list",
  },
  {
    variables: [
      {
        id: 2,
        expr: "[1, 2, 3, 4]",
        name: "a",
        code: "a = [1,2,3,4]",
        type: "list",
      },
    ],
    callStackName: "main",
    type: "assign",
  },
  {
    id: 3,
    depth: 1,
    expr: "1",
    code: "a.append(1)",
    type: "variable",
  },
  {
    variable: {
      id: 3,
      expr: "1",
      name: "a",
      code: "a.append(1)",
      type: "variable",
    },
    callStackName: "main",
    type: "append",
  },
  {
    id: 4,
    depth: 1,
    expr: "a",
    highlights: [0],
    console: null,
    code: "print(a)",
    type: "print",
  },
  {
    id: 4,
    depth: 1,
    expr: "[1, 2, 3, 4, 1]",
    highlights: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    console: "[1, 2, 3, 4, 1]\n",
    code: "print(a)",
    type: "print",
  },
];

export default appendResponseBody;
