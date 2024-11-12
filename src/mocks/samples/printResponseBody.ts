const appendResponseBody = [
  {
    id: 2,
    depth: 1,
    expr: "'song'",
    code: 'a = "song"',
    type: "variable",
  },
  {
    variables: [
      {
        id: 2,
        expr: "'song'",
        name: "a",
        code: 'a = "song"',
        type: "variable",
        idx: {
          start: 0,
          end: 0,
        },
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
    expr: "'song'",
    highlights: [0, 1, 2, 3, 4, 5],
    console: "song\n",
    code: "print(a)",
    type: "print",
  },
];

export default appendResponseBody;
