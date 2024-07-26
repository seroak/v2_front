import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.css";

import { worker } from "./mocks/browser";

if (typeof window !== "undefined") {
  if (import.meta.env.VITE_APP_NODE_ENV === "development") {
    worker.start();
  }
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
