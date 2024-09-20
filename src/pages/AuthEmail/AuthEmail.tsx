import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      // 쿼리 스트링에서 값을 추출
      const queryParams = new URLSearchParams(location.search);
      const email = queryParams.get("email"); // 예시: ?email=user@example.com

      if (!email) {
        console.error("No email found in query string");
        return;
      }

      try {
        // 쿼리 스트링 값을 fetch 요청에 포함
        const response = await fetch(`http://localhost:4000/api/data?email=${email}`);
        const result = await response.json();
        console.log(result);

        // 데이터가 성공적으로 받아졌다면 리다이렉트
        navigate("/login", { state: { data: result } });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location, navigate]); // location과 navigate 의존성 추가

  return null;
};

export default AuthEmail;
