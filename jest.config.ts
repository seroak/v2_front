import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^monaco-editor$": "<rootDir>/__mocks__/monacoEditorMock.ts", // monaco-editor 목업 사용
  },
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
};

export default config;
