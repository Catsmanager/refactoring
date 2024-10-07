import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MyPage() {
  const { userId } = useParams(); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mypage/${userId}`); // 백엔드 URL로 수정
        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div>
      <h2>마이페이지</h2>
      {userData ? (
        <div>
          <p><strong>이름:</strong> {userData.userInfoDto.name}</p>
          <p><strong>이메일:</strong> {userData.userInfoDto.email}</p>
          <p><strong>전화번호:</strong> {userData.userInfoDto.phone}</p>
          <h3>게시물 목록:</h3>
          {userData.posts.length > 0 ? (
            <ul>
              {userData.posts.map((post, index) => (
                <li key={index}>{post.title} - {post.content}</li>
              ))}
            </ul>
          ) : (
            <p>게시물이 없습니다.</p>
          )}
        </div>
      ) : (
        <p>사용자 정보를 가져올 수 없습니다.</p>
      )}
    </div>
  );
}

export default MyPage;
