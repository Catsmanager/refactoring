import React from 'react';

const IncidentRegister = () => {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">사건 등록</h1>
      
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">새 포트홀 위치 등록</h6>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="latitude">위도</label>
              <input type="text" className="form-control" id="latitude" placeholder="위도를 입력하세요" />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">경도</label>
              <input type="text" className="form-control" id="longitude" placeholder="경도를 입력하세요" />
            </div>
            <button type="submit" className="btn btn-success">등록</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncidentRegister;
