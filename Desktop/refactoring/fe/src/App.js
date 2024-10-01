import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import FestivalList from './pages/FestivalList';
import ContestSubmission from './pages/ContestSubmission';
import NoticeBoard from './pages/NoticeBoard';
import HomePage from './pages/HomePage'; 
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>축제 및 공모전 사이트</h1>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/festivals" element={<FestivalList />} />
          <Route path="/contest" element={<ContestSubmission />} />
          <Route path="/notices" element={<NoticeBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

