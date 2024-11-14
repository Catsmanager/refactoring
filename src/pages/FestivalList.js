import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/FestivalList.css';

function FestivalList() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://172.20.10.3:8080/festivals');
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('축제를 찾을 수 없습니다.');
          } else if (response.status === 500) {
            throw new Error('서버 오류가 발생했습니다.');
          } else {
            throw new Error('데이터를 가져오는 데 실패했습니다.');
          }
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('잘못된 데이터 형식');
        }

        setFestivals(data);
      } catch (error) {
        setError(error.message || '축제 데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFestivalClick = (id) => {
    navigate(`/festivals/${id}`); 
  };

  const handleWritePost = (id) => {
    navigate(`/contest-submission/${id}`); // ContestSubmission 페이지로 이동
  };

  if (loading) {
    return <div className="loading-spinner">축제 데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="error-message">에러가 발생했습니다: {error}</div>;
  }

  return (
    <div className="festival-list-container">
      <h2>축제 목록</h2>
      {festivals.length === 0 ? (
        <p>현재 등록된 축제가 없습니다.</p>
      ) : (
        <div className="festival-list">
          {festivals.map((festival, index) => {
            const imageUrl = `http://192.168.45.177:8080/images/${festival.poster}`;
            return (
              <div key={index} className="festival-card">
                <img
                  src={imageUrl}
                  alt={festival.title || '축제 이미지'}
                  className="festival-poster"
                  onClick={() => handleFestivalClick(festival.id)} // 클릭 시 축제 열람
                />
                <div className="festival-info">
                  <h3>{festival.title}</h3>
                  <p>{festival.description}</p>
                  <button onClick={() => handleWritePost(festival.id)}>공모글 작성</button> {/* 공모글 작성 버튼 */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FestivalList;

