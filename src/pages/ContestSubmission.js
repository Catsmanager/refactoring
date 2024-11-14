import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ContestSubmission.css'; 

function ContestSubmission() {
  const { id: Festival_Id } = useParams(); // Festival_Id 가져오기
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //const User_Id = 1; // 현재 로그인된 사용자의 ID

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('Title', title);
      formData.append('Content', content);
      formData.append('User_Id', User_Id); // User_Id 추가
      formData.append('Festival_Id', Festival_Id); // Festival_Id 추가
      if (file) {
        formData.append('File', file); // 파일 추가
      }

      const response = await fetch(`http://172.20.10.3:8080/posts`, { // 공모글 저장 경로
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('공모글 제출에 실패했습니다.');
      }

      alert('공모글이 성공적으로 제출되었습니다!');
      navigate(`/festivals/${Festival_Id}`); // 축제 페이지로 이동
    } catch (err) {
      setError(err.message || '공모글 제출 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contest-submission-container">
      <h2 className="contest-title">공모 하기</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="contest-submission-form">
        <label className="form-label">
          제목:
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          내용:
          <textarea
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <label className="form-label file-upload">
          파일 업로드:
          <input
            type="file"
            className="form-file-input"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit" className="form-submit-button" disabled={loading}>
          {loading ? '제출 중...' : '제출'}
        </button>
      </form>
    </div>
  );
}

export default ContestSubmission;
