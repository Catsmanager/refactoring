import React, { useEffect, useState } from "react";
import "../styles/NoticeBoard.css";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 공지사항 목록 가져오기
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`http://172.20.10.3:8080/notices`);
        if (!response.ok) {
          throw new Error("공지사항을 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setNotices(data); // 공지사항 목록 저장
      } catch (error) {
        setError(
          error.message || "공지사항 데이터를 불러오는 중 문제가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 공지사항 상세 정보 가져오기
  const handleNoticeClick = async (id) => {
    setLoading(true);
    setError(null);
    console.log("클릭한 공지사항 ID:", id); // 디버깅
    try {
      const response = await fetch(`http://172.20.10.3:8080/notices/${id}`);
      console.log("응답 상태 코드:", response.status); // 디버깅
      if (!response.ok) {
        throw new Error(
          `공지사항을 불러오는 데 실패했습니다. 상태 코드: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("받아온 공지사항 데이터:", data); // 디버깅
      setSelectedNotice(data); // 선택된 공지사항 저장
    } catch (error) {
      console.error("에러 발생:", error.message);
      setError(error.message || "공지사항 열람 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>공지사항을 불러오는 중입니다...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <div>
      <h2>공지사항</h2>
      {notices.length === 0 ? (
        <p>현재 등록된 공지사항이 없습니다.</p>
      ) : (
        notices.map((notices) => (
          <div
            key={notices.id}
            onClick={() => handleNoticeClick(notices.id)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            <h3>{notices.title}</h3>
            <p>
              <em>작성자: {notices.author}</em>
            </p>
            <p>작성일: {new Date(notices.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
      {selectedNotice && (
        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid #ddd",
            paddingTop: "10px",
          }}
        >
          <h3>{selectedNotice.title}</h3>
          <p>
            <em>작성자: {selectedNotice.author}</em>
          </p>
          <p>{selectedNotice.content}</p>
          <p>
            작성일: {new Date(selectedNotice.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;

