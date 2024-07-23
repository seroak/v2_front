import { http, HttpResponse } from "msw";
import successForAndPrintResponseBody from "./samples/successForAndPrintResponseBody.json";
import successIfAndElseResponseBody from "./samples/successIfAndElseResponseBody.json";
import successAssignResponseBody from "./samples/successAssignResponseBody.json";
// export const handlers = [
//   http.post("/v1/python", () => {
//     return HttpResponse.json([{ code: "test" }]);
//   }),
// ];

// for, print 데이터 테스트
export const handlers = [
  http.post("/v1/python", () => {
    return HttpResponse.json(successForAndPrintResponseBody);
  }),
];

// if, elif, else 데이터 테스트
// export const handlers = [
//     http.post('/v1/python', () => {
//         return HttpResponse.json(successIfAndElseResponseBody);
//     }),
// ];


// export const handlers = [
//   http.post("/v1/python", () => {
//     return HttpResponse.json(successAssignResponseBody);
//   }),
// ];
