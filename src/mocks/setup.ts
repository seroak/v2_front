// src/mocks/setup.ts
import { worker } from "./browser";

export const setupMSW = async () => {
  if (import.meta.env.VITE_APP_NODE_ENV === "development") {
    try {
      await worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
          url: `${window.location.origin}/mockServiceWorker.js`,
        },
      });
      console.log("MSW started successfully");
    } catch (error) {
      console.error("Failed to start MSW:", error);
    }
  }
};
