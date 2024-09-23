import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthEmail = () => {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // 쿼리 스트링에서 값을 추출
      const email = searchParams.get("email"); // 예시: ?
      if (!email) {
        console.error("No email found in query string");
        return;
      }

      try {
        // 쿼리 스트링 값을 fetch 요청에 포함
        const response = await fetch(`http://localhost:8080/edupi_user/v1/member/activate`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });
        /*
         * TODO: 백앤드 코드가 변경되어 json응답이 오면아래 코드를 활성화합니다.
         */
        // const result = await response.json();

        // 데이터가 성공적으로 받아졌다면 리다이렉트
        navigate("/login");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // location과 navigate 의존성 추가

  return null;
};

export default AuthEmail;
