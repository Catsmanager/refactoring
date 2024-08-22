import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import potholePositionsData from '../data/potholePositions.json';
import potholePositionsData2 from '../data/potholePositionsData2.json'; // 추가 마커 JSON 데이터 import

function MapA() {
  const [potholePositions, setPotholePositions] = useState([]);
  const [additionalMarkers, setAdditionalMarkers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isDraggableOpen, setIsDraggableOpen] = useState(true);
  const [map, setMap] = useState(null);
  const [isPotholeLayerVisible, setIsPotholeLayerVisible] = useState(true);
  const [isAdditionalLayerVisible, setIsAdditionalLayerVisible] = useState(true);
  const [clusterer, setClusterer] = useState(null);
  const [potholeMarkers, setPotholeMarkers] = useState([]);

  useEffect(() => {
    if (Array.isArray(potholePositionsData)) {
      setPotholePositions(potholePositionsData);
    } else {
      console.error('오류: 로드된 JSON 데이터가 배열이 아닙니다.');
    }
    
    if (Array.isArray(potholePositionsData2)) {
      setAdditionalMarkers(potholePositionsData2);
    } else {
      console.error('오류: 추가로 로드된 JSON 데이터가 배열이 아닙니다.');
    }
  }, []);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('mapA');
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
        calculator: [20, 50, 100, 200],  // 마커 개수에 따른 구간 설정
        styles: [
          {
            width: '30px', height: '30px',
            background: 'rgba(51, 204, 255, .8)', // 마커 개수가 20개 이하일 때 파란색
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '30px',
            fontSize: '12px',
            border: '2px solid #33ccff'
          },
          {
            width: '35px', height: '35px',
            background: 'rgba(255, 153, 0, .8)', // 마커 개수가 20개 이상 50개 이하일 때 주황색
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '35px',
            fontSize: '13px',
            border: '2px solid #ff9900'
          },
          {
            width: '40px', height: '40px',
            background: 'rgba(255, 0, 0, .8)', // 마커 개수가 50개 이상 100개 이하일 때 빨간색
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '40px',
            fontSize: '14px',
            border: '2px solid #ff0000'
          },
          {
            width: '45px', height: '45px',
            background: 'rgba(0, 128, 0, .8)', // 마커 개수가 100개 이상 200개 이하일 때 초록색
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '45px',
            fontSize: '15px',
            border: '2px solid #008000'
          },
          {
            width: '50px', height: '50px',
            background: 'rgba(128, 0, 128, .8)', // 마커 개수가 200개 이상일 때 보라색
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

  useEffect(() => {
    if (map && potholePositions.length > 0) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const markers = [];

      const createMarker = (address) => {
        return new Promise((resolve, reject) => {
          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              const marker = new window.kakao.maps.Marker({
                position: coords,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;font-size:12px;">${address}</div>`,
              });

              let isOpen = false;

              window.kakao.maps.event.addListener(marker, 'click', () => {
                if (isOpen) {
                  infowindow.close();
                } else {
                  infowindow.open(map, marker);
                }
                isOpen = !isOpen;
              });

              resolve(marker);
            } else {
              reject(`지오코딩에 실패했습니다: ${status}`);
            }
          });
        });
      };

      Promise.all(potholePositions.map(createMarker))
        .then((markers) => {
          setPotholeMarkers(markers); // 마커를 상태로 저장
          if (isPotholeLayerVisible) {
            clusterer.addMarkers(markers); // 마커 추가
          }
        })
        .catch((error) => console.error(error));
    }
  }, [map, potholePositions, clusterer, isPotholeLayerVisible]);

  useEffect(() => {
    if (map && additionalMarkers.length > 0) {
      const markers = additionalMarkers.map(({ lat, lng }) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
        });
        return marker;
      });

      if (isAdditionalLayerVisible) {
        clusterer.addMarkers(markers); // 추가 마커를 클러스터에 포함
      } else {
        clusterer.removeMarkers(markers); // 클러스터에서 제거
      }
    }
  }, [map, additionalMarkers, isAdditionalLayerVisible, clusterer]);

  const handleAddButtonClick = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    if (window.kakao && window.kakao.maps) {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const place = data[0];
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map,
          });
          map.setCenter(position);
        } else {
          console.error(`키워드 검색에 실패했습니다: ${status}`);
        }
      });
    }
  };

  const handleZipcodeSearch = () => {
    if (!zipcode.trim()) return;

    if (window.kakao && window.kakao.maps) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(zipcode, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            position: coords,
            map: map,
          });
          map.setCenter(coords);
        } else {
          console.error(`우편번호 검색에 실패했습니다: ${status}`);
        }
      });
    }
  };

  const handleResetMap = () => {
    if (map) {
      map.setCenter(new window.kakao.maps.LatLng(35.8714354, 128.582729));
      map.setLevel(3);
    }
  };

  const handleTogglePotholeLayer = () => {
    if (isPotholeLayerVisible) {
      clusterer.removeMarkers(potholeMarkers); // 포트홀 마커 제거
    } else {
      clusterer.addMarkers(potholeMarkers); // 포트홀 마커 추가
    }
    setIsPotholeLayerVisible(!isPotholeLayerVisible);
  };

  const handleToggleAdditionalLayer = () => {
    setIsAdditionalLayerVisible(!isAdditionalLayerVisible);
  };

  return (
    <div className="container-fluid">
  <h2 className="h3 mb-4 text-gray-800 font-weight-bold">
  Data map(<span style={{ color: 'red' }}>A</span>)
  </h2>

      <div id="mapA" className="card shadow mb-4" style={{ height: '700px', position: 'relative' }}>
        <Draggable>
          <div className={`modal-content ${isDraggableOpen ? '' : 'd-none'}`} style={{ width: '300px', padding: '20px', position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
            <div className="modal-header">
              <h5 className="modal-title">포트홀발생 위치 추가</h5>
              <button type="button" className="close" onClick={() => setIsDraggableOpen(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddButtonClick}>
                <div className="form-group">
                  <label htmlFor="zipcode">우편번호 입력:</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={zipcode} 
                    onChange={(e) => setZipcode(e.target.value)} 
                    id="zipcode"
                    size="30"
                  />
                  <button 
                    className="btn btn-info btn-icon-split mr-2 mt-2" 
                    type="button"
                    onClick={handleZipcodeSearch}
                  >
                    <span className="icon text-white-50">
                      <i className="fas fa-search"></i>
                    </span>
                    <span className="text">우편번호로 검색</span>
                  </button>
                </div>
                <div className="form-group">
                  <label htmlFor="keyword">주소 입력:</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                    id="keyword"
                    size="30"
                  />
                </div>
                <button 
                  className="btn btn-danger btn-icon-split mr-2" 
                  type="submit">
                  <span className="icon text-white-50">
                    <i className="fas fa-search"></i>
                  </span>
                  <span className="text">주소/장소명으로 검색</span>
                </button>
              </form>
              <small className="form-text text-muted mt-2">
                포트홀 위치를 추가하려면, 정확한 우편번호 또는 주소를 입력하세요.
              </small>
            </div>
          </div>
        </Draggable>

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

        <button 
          onClick={handleTogglePotholeLayer} 
          className="btn btn-warning btn-icon-split"
          style={{ position: 'absolute', bottom: '60px', right: '20px', zIndex: 1000 }}
        >
          <span className="icon text-white-50">
            <i className={`fas ${isPotholeLayerVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
          <span className="text">{isPotholeLayerVisible ? '21/22데이터 숨기기' : '21/22데이터 보기'}</span>
        </button>

        <button 
          onClick={handleToggleAdditionalLayer} 
          className="btn btn-secondary btn-icon-split"
          style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1000 }}
        >
          <span className="icon text-white-50">
            <i className={`fas ${isAdditionalLayerVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
          <span className="text">{isAdditionalLayerVisible ? '23/24데이터 숨기기' : '23/24데이터 보기'}</span>
        </button>
      </div>
    </div>
  );
}

export default MapA;



































