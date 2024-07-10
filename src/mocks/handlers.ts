// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import forPrintMockData from "@/fixtures/forPrintMockData.json";
// export const handlers = [
//   http.post("/v1/python", () => {
//     return HttpResponse.json([{ code: "test" }]);
//   }),
// ];

export const handlers = [
  http.post("/v1/python", () => {
    return HttpResponse.json(forPrintMockData);
  }),
];
