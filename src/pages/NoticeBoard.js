import React, { useEffect, useState } from 'react';
import '../styles/NoticeBoard.css'; 
function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`http://172.20.10.3:5000/notices`);
        if (!response.ok) {
          throw new Error('공지사항을 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        setError(error.message || '공지사항 데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleNoticeClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://172.20.10.3:5000/notices/${id}`);
      if (!response.ok) {
        throw new Error('공지사항을 불러오는 데 실패했습니다.');
      }
      const data = await response.json();
      setSelectedNotice(data);
    } catch (error) {
      setError(error.message || '공지사항 열람 중 문제가 발생했습니다.');
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
        notices.map((notice) => (
          <div key={notice.Id} onClick={() => handleNoticeClick(notice.Id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <h3>{notice.Title}</h3>
            <p><em>작성자: {notice.Author}</em></p> {/* 작성자 정보 표시 */}
            <p>작성일: {new Date(notice.Created_At).toLocaleDateString()}</p> {/* 작성일 표시 */}
          </div>
        ))
      )}
      {selectedNotice && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
          <h3>{selectedNotice.Title}</h3>
          <p><em>작성자: {selectedNotice.Author}</em></p>
          <p>{selectedNotice.Content}</p>
          <p>작성일: {new Date(selectedNotice.Created_At).toLocaleDateString()}</p> {/* 작성일 표시 */}
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;


