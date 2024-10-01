import React, { useState } from 'react';
import '../styles/ContestSubmission.css'; // 추가: CSS 파일로 스타일링

function ContestSubmission() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // 추가: 로딩 상태
  const [message, setMessage] = useState(''); // 추가: 성공/실패 메시지

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작
    setMessage(''); // 메시지 초기화

    // API로 텍스트 및 파일 업로드
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    fetch('/api/contest/submit', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error submitting contest');
        }
        return response.json();
      })
      .then(data => {
        setMessage('공모전 제출이 성공적으로 완료되었습니다!');
        setLoading(false); // 로딩 완료
      })
      .catch(error => {
        console.error('Error submitting contest:', error);
        setMessage('제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
        setLoading(false); // 에러 발생 시 로딩 종료
      });
  };

  return (
    <div className="contest-submission-container">
      <h2>공모전 참가</h2>
      <form onSubmit={handleSubmit} className="contest-form">
        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          설명:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          파일 업로드:
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? '제출 중...' : '제출'}
        </button>
      </form>
      {message && <p className="submission-message">{message}</p>} {/* 메시지 표시 */}
    </div>
  );
}

export default ContestSubmission;
