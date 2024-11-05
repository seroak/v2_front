const testResponseBody = [
  {
    id: 1,
    depth: 1,
    expr: "3",
    code: "a = 3",
    type: "variable",
  },
  {
    variables: [
      {
        id: 1,
        expr: "3",
        name: "a",
        code: "a = 3",
        type: "variable",
        idx: null,
      },
    ],
    callStackName: "main",
    type: "assign",
  },
];
export default testResponseBody;
