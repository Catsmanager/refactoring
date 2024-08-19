import React from 'react';
import { Link } from 'react-router-dom';

const IncidentList = ({ potholePositions }) => {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">포트홀 발생 위치 목록</h1>
      
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">포트홀 목록</h6>
          <Link to={'/add-pothole'}>
            <button className="btn btn-success">포트홀 위치 추가</button>
          </Link>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th width="10%">번호</th>
                  <th width="30%">위도</th>
                  <th width="30%">경도</th>
                  <th width="30%">수정/삭제</th>
                </tr>
              </thead>
              <tbody>
                {potholePositions.map((position, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{position.lat}</td>
                    <td>{position.lng}</td>
                    <td>
                      <Link to={`/edit-pothole/${index}`}>
                        <button className="btn btn-warning btn-sm">수정</button>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => console.log(`Delete pothole ${index + 1}`)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentList;




