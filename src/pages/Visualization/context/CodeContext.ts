import { createContext, SetStateAction, Dispatch } from "react";

// Create contexts
interface CodeContextType {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}
export const CodeContext = createContext<CodeContextType>({
  code: "",
  setCode: () => {},
});
