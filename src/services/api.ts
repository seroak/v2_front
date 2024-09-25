import axios from "axios";
import { User, LoginUser } from "../types/apiTypes";
export const fetchUser = async (): Promise<User> => {
  const response = await fetch("http://localhost:8080/edupi-user/v1/account/login/info", {
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
export const login = (req: LoginUser) =>
  axios.post("http://localhost:8080/edupi-user/v1/account/login", req, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
export const getGroup = async () => {
  try {
    const response = await fetch("http://localhost:8080/edupi-lms/v1/classroom", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("클래스 정보 가져오기 get요청");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};
