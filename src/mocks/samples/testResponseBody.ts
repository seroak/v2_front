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
    expr: "3",
    code: "a = 3",
    type: "variable",
  },
  {
    variable: {
      id: 7,
      expr: "10",
      name: "even_numbers",
      code: "even_numbers.append(num);",
      type: "variable",
      idx: null,
    },
    type: "append",
    callStackName: "get_even_numbers",
  },
  {
    id: 9,
    depth: 2,
    returnExpr: "even_numbers",
    code: "return even_numbers",
    type: "return",
  },
  {
    id: 9,
    depth: 2,
    returnExpr: "[2, 4, 6, 8, 10]",
    code: "return even_numbers",
    type: "return",
  },
  {
    id: 13,
    depth: 1,
    returnExpr: "[2, 4, 6, 8, 10]",
    returnArgName: "even_numbers",
    code: "even_numbers = get_even_numbers(numbers)",
    delFuncName: "get_even_numbers",
    type: "endUserFunc",
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
