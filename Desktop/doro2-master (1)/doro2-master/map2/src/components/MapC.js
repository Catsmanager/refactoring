import React, { useEffect, useState } from 'react';
import potholePositionsDataA1 from '../data/potholePositions.json'; // 주소 데이터
import potholePositionsDataA2 from '../data/potholePositionsData2.json'; // 좌표 데이터
import potholePositionsDataB from '../data/potholePositionsB.json'; // 폴리곤 데이터

function MapC() {
  const [map, setMap] = useState(null);
  const [clusterer, setClusterer] = useState(null);
  const [markersA, setMarkersA] = useState([]);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('mapC');
      const options = {
        center: new window.kakao.maps.LatLng(35.8714354, 128.582729),
        level: 5,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      const newClusterer = new window.kakao.maps.MarkerClusterer({
        map: kakaoMap,
        averageCenter: true,
        minLevel: 5,
        disableClickZoom: true,
        calculator: [20, 50, 100, 200],
        styles: [
          {
            width: '30px', height: '30px',
            background: 'rgba(51, 204, 255, .8)',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '30px',
            fontSize: '12px',
            border: '2px solid #33ccff'
          },
          {
            width: '35px', height: '35px',
            background: 'rgba(255, 153, 0, .8)',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '35px',
            fontSize: '13px',
            border: '2px solid #ff9900'
          },
          {
            width: '40px', height: '40px',
            background: 'rgba(255, 0, 0, .8)',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '40px',
            fontSize: '14px',
            border: '2px solid #ff0000'
          },
          {
            width: '45px', height: '45px',
            background: 'rgba(0, 128, 0, .8)',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '45px',
            fontSize: '15px',
            border: '2px solid #008000'
          },
          {
            width: '50px', height: '50px',
            background: 'rgba(128, 0, 128, .8)',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '50px',
            fontSize: '16px',
            border: '2px solid #800080'
          }
        ]
      });
      setMap(kakaoMap);
      setClusterer(newClusterer);
    }
  }, []);

  // 좌표 데이터인 potholePositionsDataA2.json 처리
  useEffect(() => {
    if (map && clusterer && potholePositionsDataA2.length > 0) {
      const markers = potholePositionsDataA2.map(({ lat, lng }) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
        });
        return marker;
      });
      setMarkersA(markers);
      clusterer.addMarkers(markers); // 마커 추가
    }
  }, [map, clusterer]);

  // 주소 데이터인 potholePositionsDataA1.json 처리 (지오코딩)
  useEffect(() => {
    if (map && clusterer && potholePositionsDataA1.length > 0) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      const markers = [];
      potholePositionsDataA1.forEach((address) => {
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new window.kakao.maps.Marker({
              position: coords,
            });
            markers.push(marker);

            if (markers.length === potholePositionsDataA1.length) {
              setMarkersA(prevMarkers => [...prevMarkers, ...markers]);
              clusterer.addMarkers(markers); // 마커 추가
            }
          }
        });
      });
    }
  }, [map, clusterer]);

  // MapB 데이터 처리 (여러 폴리곤 그리기)
  useEffect(() => {
    if (map && potholePositionsDataB.length > 0) {
      const newPolygons = potholePositionsDataB.map(polygonData => {
        const path = polygonData.map(({ lat, lng }) => 
          new window.kakao.maps.LatLng(lat, lng)
        );

        const polygonOptions = {
          map: map, // 폴리곤 표시
          path: path,
          strokeWeight: 3,
          strokeColor: '#39f',
          strokeOpacity: 0.8,
          fillColor: '#39f',
          fillOpacity: 0.3,
        };

        return new window.kakao.maps.Polygon(polygonOptions);
      });

      setPolygons(newPolygons);
    }
  }, [map]);

  return (
    <div className="container-fluid">
      <h2 className="h3 mb-4 text-gray-800 font-weight-bold">
  Oracle map(<span style={{ color: 'red' }}>C</span>)
</h2>

      <div id="mapC" className="card shadow" style={{ height: '700px', position: 'relative' }}>
        {/* Kakao 지도는 이 div 요소에 렌더링됩니다. */}
      </div>
    </div>
  );
}

export default MapC;






