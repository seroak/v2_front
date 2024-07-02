// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/v1/python", () => {
    return HttpResponse.json([
      {
        variables: [
          {
            expr: "1,2,3,4,5",
            highlights: [0, 1, 2, 3, 4],
            name: "a",
            type: "list",
          },
        ],
        type: "assignViz",
      },
    ]);
  }),
];
