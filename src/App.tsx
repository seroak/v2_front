import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Visualization from "./pages/Visualization/Visualization";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Modify from "./pages/Modify/Modify";
import Group from "./pages/Group/Group";
import Assginment from "./pages/Assignment/Assignment";
import Progress from "./pages/Progress/Progress";
import { useUserStore } from "./store/user";
import "./App.css";

import { setupMSW } from "./mocks/setup";

interface User {
  email: string;
  name: string;
  role: string;
}
//zustand
// 새로고침 이후 get요청을 보내면 msw가 실행되기 전에 보내지는 버그 수정
// if (typeof window !== "undefined") {
//   if (import.meta.env.VITE_APP_NODE_ENV === "development") {
//     worker.start();
//   }
// }
// msw 버그로 인해 fetchUser는 따로 확인 불가능 백엔드 서버 연결해서 확인해야함
const fetchUser = async (): Promise<User> => {
  const response = await fetch("http://localhost:8080/edupi_user/v1/member/login/info", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

function App() {
  const [isMswReady, setIsMswReady] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_APP_NODE_ENV === "development") {
      setupMSW().then(() => setIsMswReady(true));
    } else {
      setIsMswReady(true);
    }
  }, []);
  const { data } = useQuery<User>({ queryKey: ["user"], queryFn: fetchUser, enabled: isMswReady });
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/group" element={<Group />} />
        <Route path="/assignment" element={<Assginment />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default App;
