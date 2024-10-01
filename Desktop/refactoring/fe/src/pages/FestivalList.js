import React, { useEffect, useState } from 'react';
import '../styles/FestivalList.css'; // 추가: CSS 파일로 스타일링

function FestivalList() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true); // 추가: 로딩 상태
  const [error, setError] = useState(null); // 추가: 에러 상태

  useEffect(() => {
    // API로부터 축제 데이터를 가져옴
    fetch('/api/festivals')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch festivals');
        }
        return response.json();
      })
      .then(data => {
        setFestivals(data);
        setLoading(false); // 데이터 로딩 완료
      })
      .catch(error => {
        setError(error.message);
        setLoading(false); // 에러 발생 시 로딩 완료로 변경
      });
  }, []);

  // 로딩 중일 때 표시
  if (loading) {
    return <div>축제 데이터를 불러오는 중입니다...</div>;
  }

  // 에러 발생 시 표시
  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  return (
    <div className="festival-list-container">
      <h2>축제 목록</h2>
      {festivals.length === 0 ? (
        <p>현재 등록된 축제가 없습니다.</p>
      ) : (
        <div className="festival-list">
          {festivals.map((festival, index) => (
            <div key={index} className="festival-card">
              <img src={festival.poster} alt={festival.title} className="festival-poster" />
              <div className="festival-info">
                <h3>{festival.title}</h3>
                <p>{festival.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FestivalList;

