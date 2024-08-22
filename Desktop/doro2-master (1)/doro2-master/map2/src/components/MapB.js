import React, { useEffect, useState } from 'react';
import cause1Polygons1 from '../data/cause1Polygons1.json';
import cause1Polygons2 from '../data/cause1Polygons2.json';
import cause1Polygons3 from '../data/cause1Polygons3.json';
import cause2Polygons1 from '../data/cause2Polygons1.json'; // 새로 추가
import cause2Polygons2 from '../data/cause2Polygons2.json'; // 새로 추가
import cause2Polygons3 from '../data/cause2Polygons3.json';
import cause3Polygons from '../data/cause3Polygons.json';

function MapB() {
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState({});
  const [showCause1Options, setShowCause1Options] = useState(false);
  const [showCause2Options, setShowCause2Options] = useState(false); // 교통 버튼 토글 상태

  const initialPosition = new window.kakao.maps.LatLng(35.8714354, 128.582729);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=ff20f49c0e3e497ad3a297a4cf9ac213&autoload=false';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('mapB');
        const options = {
          center: initialPosition,
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);

        // 폴리곤 생성
        const createdPolygons = {
          cause1_1: createPolygons(kakaoMap, cause1Polygons1, '#0000FF'), // 오렌지색
          cause1_2: createPolygons(kakaoMap, cause1Polygons2, '#0000FF'), // 
          cause1_3: createPolygons(kakaoMap, cause1Polygons3, '#0000FF'), // 보라색
          cause2_1: createPolygons(kakaoMap, cause2Polygons1, '#D2691E'), // 파란색
          cause2_2: createPolygons(kakaoMap, cause2Polygons2, '#D2691E'), // 어두운 파란색
          cause2_3: createPolygons(kakaoMap, cause2Polygons3, '#D2691E'), // 핑크색
          cause3: createPolygons(kakaoMap, cause3Polygons, '#F39C12'), // 황금색
        };
        setPolygons(createdPolygons);
      });
    };
  }, []);

  const createPolygons = (map, pathsArray, color) => {
    return pathsArray.map(path => new window.kakao.maps.Polygon({
      map: map,
      path: path.map(coord => new window.kakao.maps.LatLng(coord.lat, coord.lng)),
      strokeWeight: 2,
      strokeColor: color,
      strokeOpacity: 0.8,
      fillColor: color,
      fillOpacity: 0.3,
    }));
  };

  const togglePolygonsVisibility = (cause) => {
    const updatedPolygons = { ...polygons };
    updatedPolygons[cause].forEach(polygon => {
      const isVisible = polygon.getMap() !== null;
      polygon.setMap(isVisible ? null : map);
    });
    setPolygons(updatedPolygons);
  };

  const handleResetMap = () => {
    if (map) {
      map.setCenter(initialPosition);
      map.setLevel(3);
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="h3 mb-4 text-gray-800 font-weight-bold">Hazard map(B)</h2>
      <div id="mapB" className="card shadow mb-4" style={{ height: '700px', position: 'relative' }}>
        
        {/* 폴리곤 토글 버튼들 */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <button 
            className="btn btn-sm mb-2" 
            style={{ backgroundColor: '#000080', borderColor: '#000080', color: '#FFFFFF', opacity: 0.9 }}
            onClick={() => setShowCause1Options(!showCause1Options)}
          >
            <span style={{ fontWeight: 'bold' }}>침수</span>
          </button>
          {showCause1Options && (
            <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
              <button className="btn btn-sm mb-1" 
                style={{ backgroundColor: '#0000CD', borderColor: '#0000CD', color: '#FFFFFF', opacity: 0.9 }}
                onClick={() => togglePolygonsVisibility('cause1_1')}>
                침수1 {polygons.cause1_1 && polygons.cause1_1[0].getMap() ? '숨김' : '표시'}
              </button>
              <button className="btn btn-sm mb-1" 
                style={{ backgroundColor: '#0000CD', borderColor: '#0000CD', color: '#FFFFFF', opacity: 0.9 }}
                onClick={() => togglePolygonsVisibility('cause1_2')}>
                침수2 {polygons.cause1_2 && polygons.cause1_2[0].getMap() ? '숨김' : '표시'}
              </button>
              <button className="btn btn-sm mb-2" 
                style={{ backgroundColor: '#0000CD', borderColor: '#0000CD', color: '#FFFFFF', opacity: 0.9 }}
                onClick={() => togglePolygonsVisibility('cause1_3')}>
                침수3 {polygons.cause1_3 && polygons.cause1_3[0].getMap() ? '숨김' : '표시'}
              </button>
            </div>
          )}
          <button 
            className="btn btn-sm mb-2" 
            style={{ backgroundColor: '#8B4513', borderColor: '#8B4513', color: '#FFFFFF', opacity: 0.9 }}
            onClick={() => setShowCause2Options(!showCause2Options)}
          >
            <span style={{ fontWeight: 'bold' }}>교통</span>
          </button>
          {showCause2Options && (
            <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
              <button className="btn btn-sm mb-1" 
                style={{ backgroundColor: '#A0522D', borderColor: '#A0522D', color: '#FFFFFF', opacity: 0.9 }}
                onClick={() => togglePolygonsVisibility('cause2_1')}>
                교통1 {polygons.cause2_1 && polygons.cause2_1[0].getMap() ? '숨김' : '표시'}
              </button>
              <button className="btn btn-sm mb-2" 
                style={{ backgroundColor: '#A0522D', borderColor: '#A0522D', color: '#FFFFFF', opacity: 0.9 }}
                onClick={() => togglePolygonsVisibility('cause2_2')}>
                교통2 {polygons.cause2_2 && polygons.cause2_2[0].getMap() ? '숨김' : '표시'}
              </button>
              <button className="btn btn-sm mb-2" 
                style={{ backgroundColor: '#A0522D', borderColor: '#A0522D', color: '#FFFFFF', opacity: 0.9 }}
                onClick={() => togglePolygonsVisibility('cause2_3')}>
                교통3 {polygons.cause2_3 && polygons.cause2_3[0].getMap() ? '숨김' : '표시'}
              </button>
            </div>
          )}
          <button className="btn btn-sm" 
            style={{ backgroundColor: '#F39C12', borderColor: '#F39C12', color: '#FFFFFF', opacity: 0.9 }}
            onClick={() => togglePolygonsVisibility('cause3')}>
            <span style={{ fontWeight: 'bold' }}>균열</span> {polygons.cause3 && polygons.cause3[0].getMap() ? '숨김' : '표시'}
          </button>
        </div>

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

export default MapB;













