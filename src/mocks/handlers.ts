// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.post("/api/code", (req) => {
    console.log("Request data:", req);
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      {
        variable_list: [
          {
            depth: 1,
            expr: "3",
            name: "a",
          },
        ],
        type: "varList",
      },
      {
        id: 1,
        depth: 1,
        condition: {
          target: "i",
          cur: 0,
          start: 0,
          end: 3,
          step: 2,
        },
        highlight: ["target", "cur", "start", "end", "step"],
        type: "for",
      },
      {
        id: 2,
        depth: 2,
        expr: "' ' * (a - (i + 1))",
        highlight: [],
        type: "print",
      },
      {
        id: 2,
        depth: 2,
        expr: "' ' * (3 - (0 + 1))",
        highlight: [7, 12],
        type: "print",
      },
      {
        id: 2,
        depth: 2,
        expr: "  ",
        highlight: [0, 1],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "'*' * (i + 1)",
        highlight: [],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "'*' * (0 + 1)",
        highlight: [7],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "*",
        highlight: [0],
        type: "print",
      },
      {
        id: 1,
        depth: 1,
        condition: {
          target: "i",
          cur: 1,
          start: 0,
          end: 3,
          step: 2,
        },
        highlight: ["cur"],
        type: "for",
      },
      {
        id: 2,
        depth: 2,
        expr: "' ' * (a - (i + 1))",
        highlight: [],
        type: "print",
      },
      {
        id: 2,
        depth: 2,
        expr: "' ' * (3 - (1 + 1))",
        highlight: [7, 12],
        type: "print",
      },
      {
        id: 2,
        depth: 2,
        expr: " ",
        highlight: [0],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "'*' * (i + 1)",
        highlight: [],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "'*' * (1 + 1)",
        highlight: [7],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "**",
        highlight: [0, 1],
        type: "print",
      },
      {
        id: 1,
        depth: 1,
        condition: {
          target: "i",
          cur: 2,
          start: 0,
          end: 3,
          step: 1,
        },
        highlight: ["cur"],
        type: "for",
      },
      {
        id: 2,
        depth: 2,
        expr: "' ' * (a - (i + 1))",
        highlight: [],
        type: "print",
      },
      {
        id: 2,
        depth: 2,
        expr: "' ' * (3 - (2 + 1))",
        highlight: [7, 12],
        type: "print",
      },
      {
        id: 2,
        depth: 2,
        expr: "",
        highlight: [],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "'*' * (i + 1)",
        highlight: [],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "'*' * (2 + 1)",
        highlight: [7],
        type: "print",
      },
      {
        id: 3,
        depth: 2,
        expr: "***",
        highlight: [0, 1, 2],
        type: "print",
      },
    ]);
  }),
];
