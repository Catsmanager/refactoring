import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MyPage.css'; 
function MyPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://172.20.10.3:5000/mypage/${userId}`); // 유저 정보 API
        if (!response.ok) {
          throw new Error('유저 데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setUserData(data);
        setPosts(data.posts || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handlePostClick = async (postId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://172.20.10.3:5000/mypage/${userId}/${postId}`); // 글 조회 API
      if (!response.ok) {
        throw new Error('글을 가져오는 데 실패했습니다.');
      }
      const postData = await response.json();
      setSelectedPost(postData);
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
          <p><strong>이름:</strong> {userData.Name}</p> {/* 수정 필요 */}
          <p><strong>이메일:</strong> {userData.Email}</p> {/* 수정 필요 */}
          <p><strong>전화번호:</strong> {userData.Phone}</p> {/* 수정 필요 */}
          <h3>게시물 목록:</h3>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.Id} onClick={() => handlePostClick(post.Id)}> {/* 수정 필요 */}
                  {post.Title} {/* 수정 필요 */}
                </li>
              ))}
            </ul>
          ) : (
            <p>게시물이 없습니다.</p>
          )}
          {selectedPost && (
            <div>
              <h3>선택한 게시물</h3>
              <p><strong>제목:</strong> {selectedPost.Title}</p>
              <p><strong>내용:</strong> {selectedPost.Content}</p> {/*확인 */}
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
