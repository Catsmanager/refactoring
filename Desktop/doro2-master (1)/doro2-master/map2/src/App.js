
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/sb-admin-2.min.css';

import Sidebar from './components/Sidebar';

import MapA from './components/MapA';
import MapB from './components/MapB';
import MapC from './components/MapC';
import Map from './components/Map';

import IncidentList from './components/IncidentList';
import IncidentRegister from './components/IncidentRegister';

import './App.css';



function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [potholePositions, setPotholePositions] = useState([]); // 포트홀 위치 상태 관리


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const addPothole = (position) => {
    setPotholePositions([...potholePositions, position]);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Map />} /> 
            <Route path="/map-a" element={<MapA potholePositions={potholePositions} addPothole={addPothole} />} />
            <Route path="/map-b" element={<MapB />} />
            <Route path="/map-c" element={<MapC />} />
            <Route path="/incident-list" element={<IncidentList potholePositions={potholePositions} />} /> {/* 사건 목록 확인 페이지 */}
            <Route path="/incident-register" element={<IncidentRegister />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

