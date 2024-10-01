import React, { useState } from 'react';
import '../styles/Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(null);

   
    console.log('Email:', email, 'Password:', password);

   
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        alert('로그인 성공!');
      } else {
        setError('이메일 또는 비밀번호가 잘못되었습니다.');
      }
      setLoading(false); 
    }, 1000);
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
