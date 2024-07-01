import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import RQProvider from "./RQProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //시작

  <RQProvider>
    <App />
  </RQProvider>
);
