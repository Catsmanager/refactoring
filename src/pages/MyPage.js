import React, { useEffect, useState } from 'react';
import '../styles/MyPage.css';

function MyPage() {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 유저 정보와 게시물 목록 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://172.20.10.3:8080/mypage`, {
          method: 'GET',
          credentials: 'include', // 세션 쿠키 포함
        });
        if (!response.ok) {
          throw new Error(`유저 데이터를 가져오는 데 실패했습니다. 상태 코드: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data); // 유저 데이터 저장
        setPosts(data.posts || []); // 게시물 목록 저장
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 특정 게시물 조회
  const handlePostClick = async (postId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://172.20.10.3:8080/mypage/${postId}`, {
        method: 'GET',
        credentials: 'include', // 세션 쿠키 포함
      });
      if (!response.ok) {
        throw new Error(`게시물을 가져오는 데 실패했습니다. 상태 코드: ${response.status}`);
      }
      const postData = await response.json();
      setSelectedPost(postData); // 선택된 게시물 저장
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div>
      <h2>마이페이지</h2>
      {userData ? (
        <div>
          <p><strong>이름:</strong> {userData.name}</p>
          <p><strong>이메일:</strong> {userData.email}</p>
          <p><strong>전화번호:</strong> {userData.phone}</p>
          <h3>게시물 목록:</h3>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id} onClick={() => handlePostClick(post.id)}>
                  {post.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>게시물이 없습니다.</p>
          )}
          {selectedPost && (
            <div>
              <h3>선택한 게시물</h3>
              <p><strong>제목:</strong> {selectedPost.title}</p>
              <p><strong>내용:</strong> {selectedPost.content}</p>
            </div>
          )}
        </div>
      ) : (
        <p>사용자 정보를 가져올 수 없습니다.</p>
      )}
    </div>
  );
}

export default MyPage;
