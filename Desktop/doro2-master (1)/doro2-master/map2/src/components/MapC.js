import React, { useEffect, useState } from 'react';
import seoguDatabase from '../data/seogudatabase.json'; // MapA의 데이터
import otherDatabase from '../data/otherdatabase.json'; // MapB의 데이터 (예시)

function MapC() {
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [zipcode, setZipcode] = useState('');

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('mapC');
      const options = {
        center: new window.kakao.maps.LatLng(35.8714354, 128.582729),
        level: 5,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
    }
  }, []);

  useEffect(() => {
    if (map) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 5,
        disableClickZoom: true,
        calculator: [20, 50],
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
          }
        ]
      });

      const createMarker = (item, isMapBData = false) => {
        return new Promise((resolve, reject) => {
          geocoder.addressSearch(item.location, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              const marker = new window.kakao.maps.Marker({
                position: coords,
              });

              const content = `
                <div style="padding:10px; font-size:14px; color:#333; background-color:#fff;">
                  <div style="margin-bottom:5px; font-weight:bold; font-size:16px; color:#2c3e50;">
                    <strong>위치:</strong> ${item.location}
                  </div>
                  <div style="margin-bottom:5px;">
                    <strong style="color:#e74c3c;">파손 유형:</strong> ${item.damage_type}
                  </div>
                  <div style="margin-bottom:5px;">
                    <strong style="color:#2980b9;">범위:</strong> ${item.scale} m²
                  </div>
                  <div style="margin-bottom:5px;">
                    <strong style="color:#27ae60;">파손 횟수:</strong> ${item.damage_count}
                  </div>
                  <div style="margin-bottom:5px;">
                    <strong style="color:#8e44ad;">사용 자재:</strong> ${item.material_name}
                  </div>
                  <div style="margin-bottom:5px;">
                    <strong style="color:#d35400;">발생 일자:</strong> ${item.report_date}
                  </div>
                </div>
              `;

              const infowindow = new window.kakao.maps.InfoWindow({
                content: content,
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

      // MapA 데이터 생성
      Promise.all(seoguDatabase.map(item => createMarker(item)))
        .then((markers) => {
          clusterer.addMarkers(markers);
        })
        .catch((error) => console.error(error));

      // MapB 데이터 생성
      Promise.all(otherDatabase.map(item => createMarker(item, true)))
        .then((markers) => {
          clusterer.addMarkers(markers);
        })
        .catch((error) => console.error(error));
    }
  }, [map]);

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
      map.setLevel(5);
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="h3 mb-4 text-gray-800">Map C</h2>
      <div id="mapC" className="card shadow mb-4" style={{ height: '700px', position: 'relative' }}>
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


