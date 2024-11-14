import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ContestSubmission.css'; 

function ContestSubmission() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch(`http://172.20.10.3:8080/festivals/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('공모글 제출에 실패했습니다.');
      }

      alert('공모글이 성공적으로 제출되었습니다!');
      navigate(`/festivals/${id}`);
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
