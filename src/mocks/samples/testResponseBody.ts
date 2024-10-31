const testResponseBody = [
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
        idx: {
          start: 0,
          end: 3,
        },
        type: "list",
      },
    ],
    callStackName: "main",
    type: "assign",
  },
  {
    id: 3,
    depth: 1,
    expr: "9",

    code: "a[0] = 9",
    type: "variable",
  },
  {
    variables: [
      {
        id: 3,
        expr: "9",
        idx: {
          start: 0,
          end: 0,
        },
        name: "a",
        code: "a[0] = 9",
        type: "variable",
      },
    ],
    callStackName: "main",
    type: "assign",
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
    expr: "[9, 2, 3, 4]",
    highlights: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    console: "[9, 2, 3, 4]\n",
    code: "print(a)",
    type: "print",
  },
];

export default testResponseBody;
