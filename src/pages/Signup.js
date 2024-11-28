import React, { useState } from "react";
import "../styles/Signup.css";

function Signup() {
  const [name, setname] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      phone,
      password,
    };

    fetch("http://172.20.10.3:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("회원가입 실패");
        }
        return response.json();
      })
      .then((data) => {
        setMessage("회원가입이 성공적으로 완료되었습니다!");
      })
      .catch((error) => {
        setMessage("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="signup-container container mt-5">
      <h2 className="text-center">회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>사용자 이름:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>전화번호:</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>이메일:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>비밀번호:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">
          가입하기
        </button>
        {message && (
          <p
            className={`signup-message ${
              message.includes("오류") ? "text-danger" : "text-success"
            } mt-3`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Signup;
