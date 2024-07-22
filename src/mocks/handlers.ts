import { http, HttpResponse } from 'msw';
import successForAndPrintResponseBody from './samples/successForAndPrintResponseBody.json';
import successIfAndElseResponseBody from './samples/successIfAndElseResponseBody.json';
// export const handlers = [
//   http.post("/v1/python", () => {
//     return HttpResponse.json([{ code: "test" }]);
//   }),
// ];

// export const handlers = [
//   http.post("/v1/python", () => {
//     return HttpResponse.json(successForAndPrintResponseBody);
//   }),
// ];

export const handlers = [
    http.post('/v1/python', () => {
        return HttpResponse.json(successIfAndElseResponseBody);
    }),
];
