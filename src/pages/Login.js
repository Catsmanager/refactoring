import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://172.20.10.3:8080/login", {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, 
          password 
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      let data;
      if (response.headers.get('content-type')?.includes('application/json')) {
        data = await response.json();
      } else {
        throw new Error('서버 응답이 JSON 형식이 아닙니다.');
      }

      if (response.ok) {
        // 로그인 성공 처리
        alert('로그인 성공!');
        setIsLoggedIn(true); // 로그인 상태 업데이트
        window.$('#authModal').modal('hide'); // 모달 닫기
      } else {
        setError(data.message || '이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (err) {
      setError('서버와의 통신 중 오류가 발생했습니다.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;

