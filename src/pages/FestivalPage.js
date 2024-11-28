import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function FestivalPage() {
  const { id } = useParams(); // URL에서 축제 ID 가져오기
  const [festival, setFestival] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const response = await fetch(`/festivals/${id}`); // 축제 상세 정보 API 호출
        if (!response.ok)
          throw new Error("축제 정보를 불러오는 데 실패했습니다.");
        const data = await response.json();
        setFestival(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFestival();
  }, [id]);

  if (!festival) return <p>로딩 중...</p>; // 데이터 로딩 중 메시지 표시

  const handleGoToContest = () => {
    navigate(`/contest`); // 공모글 작성 페이지로 이동
  };

  return (
    <div>
      <h2>{festival.title}</h2>
      <p>{festival.content}</p>
      <p>
        <strong>주최:</strong> {festival.host}
      </p>
      <p>
        <strong>날짜:</strong> {festival.date}
      </p>
      {/* 공모하러 가기 버튼 */}
      <button onClick={handleGoToContest} style={{ marginTop: "20px" }}>
        공모하러 가기
      </button>
    </div>
  );
}

export default FestivalPage;
