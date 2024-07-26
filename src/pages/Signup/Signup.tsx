import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Signup.module.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (!formData.username.trim()) newErrors.username = "사용자 이름은 필수입니다.";
    if (!formData.email.trim()) newErrors.email = "이메일은 필수입니다.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "유효한 이메일 주소를 입력하세요.";
    if (!formData.password) newErrors.password = "비밀번호는 필수입니다.";
    else if (formData.password.length < 6) newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // 회원가입 API 호출해야하는 부분
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.signupForm} noValidate>
      <div className={styles.formGroup}>
        <label htmlFor="username">사용자 이름</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.username && <div className={styles.errorMessage}>{errors.username}</div>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={styles.formInput}
          required
          minLength={6}
        />
        {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
        {errors.confirmPassword && <div className={styles.errorMessage}>{errors.confirmPassword}</div>}
      </div>
      <button type="submit" className={styles.submitButton}>
        회원가입
      </button>
    </form>
  );
};

export default Signup;
