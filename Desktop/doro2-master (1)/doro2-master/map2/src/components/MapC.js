import React, { useEffect, useState } from 'react';

function MapC() {
  const [map, setMap] = useState(null);

  const initialPosition = new window.kakao.maps.LatLng(33.450701, 126.570667); // 초기 위치

  // 포트홀 위험 지역 예시 데이터
  const exampleData = [
    { lat: 33.450701, lng: 126.570667, risk: 'high' }, // 고위험
    { lat: 33.450936, lng: 126.569477, risk: 'medium' }, // 중위험
    { lat: 33.450879, lng: 126.572299, risk: 'low' }, // 저위험
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=ff20f49c0e3e497ad3a297a4cf9ac213&autoload=false';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('mapC');
        const options = {
          center: initialPosition,
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);

        // 예시 데이터 기반 마커 생성
        exampleData.forEach((data) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(data.lat, data.lng),
            map: kakaoMap,
            title: `위험도: ${data.risk}`,
            image: new window.kakao.maps.MarkerImage(
              data.risk === 'high' ? 'https://via.placeholder.com/40x40/FF0000/FFFFFF?text=H' :
              data.risk === 'medium' ? 'https://via.placeholder.com/35x35/FFA500/FFFFFF?text=M' :
              'https://via.placeholder.com/30x30/0000FF/FFFFFF?text=L',
              new window.kakao.maps.Size(40, 40),
              { offset: new window.kakao.maps.Point(20, 40) }
            )
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">위험도: ${data.risk}</div>`,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(kakaoMap, marker);
          });
        });
      });
    };
  }, []);

  const handleResetMap = () => {
    if (map) {
      map.setCenter(initialPosition); // 지도를 초기 위치로 이동
      map.setLevel(3); // 줌 레벨을 초기 설정으로 되돌림
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="h3 mb-4 text-gray-800">Map C</h2>
      <div id="mapC" className="card shadow mb-4" style={{ height: '700px', position: 'relative' }}>
        
        {/* 처음 위치로 돌아가기 버튼 */}
        <button 
          onClick={handleResetMap} 
          className="btn btn-primary btn-icon-split"
          style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000 }}
        >
          <span className="icon text-white-50">
            <i className="fas fa-home"></i>
          </span>
          <span className="text">처음 위치로</span>
        </button>
      </div>
    </div>
  );
}

export default MapC;

