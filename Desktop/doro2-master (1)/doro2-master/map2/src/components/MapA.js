import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import potholePositionsData from '../data/potholePositions.json';

function MapA() {
  const [potholePositions, setPotholePositions] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isDraggableOpen, setIsDraggableOpen] = useState(true);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (Array.isArray(potholePositionsData)) {
      setPotholePositions(potholePositionsData);
    } else {
      console.error('Error: The loaded JSON data is not an array.');
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
      setMap(kakaoMap);
    }
  }, []);

  useEffect(() => {
    if (map && potholePositions.length > 0) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const markers = [];
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 5,
        disableClickZoom: true,
        calculator: [20, 50], // 마커 개수에 따른 구간 설정
        styles: [
            {
                width: '30px', height: '30px',
                background: 'rgba(51, 204, 255, .8)', // 10개 이하인 경우 파란색
                borderRadius: '50%',
                color: '#fff',
                textAlign: 'center',
                lineHeight: '30px',
                fontSize: '12px',
                border: '2px solid #33ccff'
            },
            {
                width: '35px', height: '35px',
                background: 'rgba(255, 153, 0, .8)', // 10개 이상 40개 이하인 경우 주황색
                borderRadius: '50%',
                color: '#fff',
                textAlign: 'center',
                lineHeight: '35px',
                fontSize: '13px',
                border: '2px solid #ff9900'
            },
            {
                width: '40px', height: '40px',
                background: 'rgba(255, 0, 0, .8)', // 40개 이상인 경우 빨간색
                borderRadius: '50%',
                color: '#fff',
                textAlign: 'center',
                lineHeight: '40px',
                fontSize: '14px',
                border: '2px solid #ff0000'
            }
        ]
      });

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
              reject(`Geocode was not successful for the following reason: ${status}`);
            }
          });
        });
      };

      Promise.all(potholePositions.map(createMarker))
        .then((markers) => {
          clusterer.addMarkers(markers);
        })
        .catch((error) => console.error(error));
    }
  }, [map, potholePositions]);

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
          console.error(`Place search was not successful for the following reason: ${status}`);
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
          console.error(`Zipcode search was not successful for the following reason: ${status}`);
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

  return (
    <div className="container-fluid">
      <h2 className="h3 mb-4 text-gray-800">Map A</h2>
      <div id="mapA" className="card shadow mb-4" style={{ height: '700px', position: 'relative' }}>
        <Draggable>
          <div className={`modal-content ${isDraggableOpen ? '' : 'd-none'}`} style={{ width: '300px', padding: '20px', position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
            <div className="modal-header">
              <h5 className="modal-title">포트홀 발생 위치 추가</h5>
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
                  <label htmlFor="keyword">주소/장소명 입력:</label>
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
      </div>
    </div>
  );
}

export default MapA;
















