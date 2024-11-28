import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ContestSubmission.css";

function ContestSubmission() {
  const { id: Festival_Id } = useParams(); // URL에서 Festival_Id 가져오기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("festivalId", Festival_Id); // Festival_Id 추가

      // API 호출
      const response = await fetch(`http://172.20.10.3:8080/festivals/{id}`, {
        method: "POST",
        body: formData,
        credentials: "include", // 세션 쿠키를 포함하여 인증
      });

      if (!response.ok) {
        throw new Error("공모글 제출에 실패했습니다.");
      }

      // 성공 메시지 및 페이지 이동
      alert("공모글이 성공적으로 제출되었습니다!");
      navigate(`/festivals`);
    } catch (err) {
      // 에러 처리
      setError(err.message || "공모글 제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contest-submission-container">
      <h2 className="contest-title">공모 하기</h2>
      {error && (
        <p className="error-message">
          {error}{" "}
          <button onClick={() => setError(null)} className="close-button">
            닫기
          </button>
        </p>
      )}
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
        <button type="submit" className="form-submit-button" disabled={loading}>
          {loading ? "제출 중..." : "제출"}
        </button>
      </form>
    </div>
  );
}

export default ContestSubmission;

