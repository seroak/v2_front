import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Visualization from "./pages/Visualization/Visualization";
import Signup from "./pages/Signup/Signup";
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
        <Route path="/viz" element={<Visualization />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
