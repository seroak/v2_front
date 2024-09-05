import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Visualization from "./pages/Visualization/Visualization";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

import { worker } from "./mocks/browser";
interface User {
  name: string;
}
//zustand
import { useUserStore } from "./store/user";
if (typeof window !== "undefined") {
  if (import.meta.env.VITE_APP_NODE_ENV === "development") {
    worker.start();
  }
}
// msw 버그로 인해 fetchUser는 따로 확인 불가능 백엔드 서버 연결해서 확인해야함
const fetchUser = async (): Promise<User> => {
  const response = await fetch("htttp://localhost:8083/edupi_user/v1/member/load", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

function App() {
  const loggedInUserName = useUserStore((state) => state.setLoggedInUserName);
  const { data } = useQuery<User, Error>({ queryKey: ["user"], queryFn: fetchUser });

  useEffect(() => {
    if (data) {
      loggedInUserName(data.name);
    }
  }, [data]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viz" element={<Visualization />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
