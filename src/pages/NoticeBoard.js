import React, { useEffect, useState } from 'react';

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
          <div key={notice.id} onClick={() => handleNoticeClick(notice.id)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            <h3>{notice.title}</h3>
          </div>
        ))
      )}
      {selectedNotice && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
          <h3>{selectedNotice.title}</h3>
          <p>{selectedNotice.content}</p>
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;

