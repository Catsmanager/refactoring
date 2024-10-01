import React, { useEffect, useState } from 'react';

function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // 공지사항 API 호출
    fetch('/api/notices')
      .then(response => response.json())
      .then(data => setNotices(data))
      .catch(error => console.error('Error fetching notices:', error));
  }, []);

  return (
    <div>
      <h2>공지사항</h2>
      {notices.map((notice, index) => (
        <div key={index}>
          <h3>{notice.title}</h3>
          <p>{notice.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NoticeBoard;
