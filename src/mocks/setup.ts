// src/mocks/setup.ts
import { worker } from "./browser";

export const setupMSW = async () => {
  if (import.meta.env.VITE_APP_NODE_ENV === "development") {
    return worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });
  }
  return Promise.resolve();
};
