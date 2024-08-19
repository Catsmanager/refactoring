import React, { useEffect, useState } from 'react';
import cause1Polygons from '../data/cause1Polygons.json';
import cause2Polygons from '../data/cause2Polygons.json';
import cause3Polygons from '../data/cause3Polygons.json';

function MapB() {
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState({});

  const initialPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

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
          cause1: createPolygons(kakaoMap, cause1Polygons, '#FF0000'),
          cause2: createPolygons(kakaoMap, cause2Polygons, '#00FF00'),
          cause3: createPolygons(kakaoMap, cause3Polygons, '#0000FF')
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
      <h2 className="h3 mb-4 text-gray-800">Map B</h2>
      <div id="mapB" className="card shadow mb-4" style={{ height: '700px', position: 'relative' }}>
        
        {/* 폴리곤 토글 버튼들 */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
          <button className="btn btn-danger btn-sm mr-2" onClick={() => togglePolygonsVisibility('cause1')}>
            <span style={{ fontWeight: 'bold' }}>원인 1</span> {polygons.cause1 && polygons.cause1[0].getMap() ? '숨김' : '표시'}
          </button>
          <button className="btn btn-success btn-sm mr-2" onClick={() => togglePolygonsVisibility('cause2')}>
            <span style={{ fontWeight: 'bold' }}>원인 2</span> {polygons.cause2 && polygons.cause2[0].getMap() ? '숨김' : '표시'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => togglePolygonsVisibility('cause3')}>
            <span style={{ fontWeight: 'bold' }}>원인 3</span> {polygons.cause3 && polygons.cause3[0].getMap() ? '숨김' : '표시'}
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








