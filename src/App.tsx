import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Visualization from "./pages/Visualization/Visualization";
import VisualizationClassroom from "./pages/Visualization/VisualizationClassroom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Manage from "./pages/Manage/Manage";
import ClassroomSpace from "./pages/ClassroomSpace/ClassroomSpace";
import Assginment from "./pages/Assignment/Assignment";
import Clssroom from "./pages/Classroom/Classroom";
import AuthEmail from "./pages/AuthEmail/AuthEmail";

import { useUserStore } from "./store/user";
import { useMswReadyStore } from "@/store/mswReady";
import "./App.css";

import { setupMSW } from "./mocks/setup";
import { getUser } from "@/services/api";

interface User {
  email: string;
  name: string;
  role: string;
}

function App() {
  const { isMswReady, setIsMswReady } = useMswReadyStore((state) => state);

  useEffect(() => {
    async function initializeMSW() {
      if (typeof window !== "undefined") {
        if (import.meta.env.VITE_APP_NODE_ENV === "development") {
          await setupMSW();
          setIsMswReady(true);
        } else {
          setIsMswReady(true);
        }
      }
    }

    initializeMSW();
  }, [setIsMswReady]);

  const { data } = useQuery<User>({ queryKey: ["user"], queryFn: getUser, enabled: isMswReady });
  const setLoggedInUserEmail = useUserStore((state) => state.setLoggedInUserEmail);
  const setLoggedInUserName = useUserStore((state) => state.setLoggedInUserName);
  const setLoggedInUserRole = useUserStore((state) => state.setLoggedInUserRole);

  useEffect(() => {
    if (data) {
      setLoggedInUserEmail(data.email);
      setLoggedInUserName(data.name);
      setLoggedInUserRole(data.role);
    }
  }, [data]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viz" element={<Visualization />} />
        <Route path="/classroomspace/classroom/viz/:classroomId" element={<VisualizationClassroom />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/classroomspace/classroom/manage/:classroomId" element={<Manage />} />
        <Route path="/classroomspace" element={<ClassroomSpace />} />
        <Route path="/assignment" element={<Assginment />} />
        <Route path="/auth/email" element={<AuthEmail />} />
        <Route path="/classroomspace/classroom/:classroomId" element={<Clssroom />} />
      </Routes>
    </Router>
  );
}

export default App;
