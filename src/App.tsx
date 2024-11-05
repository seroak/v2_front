import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Visualization from "./pages/Visualization/Visualization";
import VisualizationClassroom from "./pages/Visualization/VisualizationClassroom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Manage from "./pages/Manage/Manage";
import ClassroomDashboard from "./pages/ClassroomDashboard/ClassroomDashboard";
import Assginment from "./pages/Assignment/Assignment";
import Clssroom from "./pages/Classroom/Classroom";
import AuthEmail from "./pages/AuthEmail/AuthEmail";

import { useMswReadyStore } from "@/store/mswReady";
import "./App.css";

import { setupMSW } from "./mocks/setup";

export interface User {
  email: string;
  name: string;
  role: string;
}

function App() {
  const { setIsMswReady } = useMswReadyStore((state) => state);

  useEffect(() => {
    async function initializeMSW() {
      if (typeof window !== "undefined") {
        if (import.meta.env.VITE_APP_NODE_ENV === "development") {
          await setupMSW();
        }
        setIsMswReady(true);
      }
    }

    initializeMSW();
  }, [setIsMswReady]);
  if (import.meta.env.VITE_APP_NODE_ENV === "production") {
    console = window.console || {};
    console.log = function no_console() {};
    console.warn = function no_console() {};
    console.error = function () {};
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viz" element={<Visualization />} />
        <Route path="/classroomdashboard/classroom/viz/:classroomId" element={<VisualizationClassroom />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/classroomdashboard/classroom/manage/:classroomId" element={<Manage />} />
        <Route path="/classroomdashboard" element={<ClassroomDashboard />} />
        <Route path="/assignment" element={<Assginment />} />
        <Route path="/auth/email" element={<AuthEmail />} />
        <Route path="/classroomdashboard/classroom/:classroomId" element={<Clssroom />} />
      </Routes>
    </Router>
  );
}

export default App;
