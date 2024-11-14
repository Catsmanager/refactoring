import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup'

import HomePage from './pages/HomePage';

import FestivalList from './pages/FestivalList';

import NoticeBoard from './pages/NoticeBoard';

import ContestSubmission from './pages/ContestSubmission';
import CustomizeFestival from './pages/CustomizeFestival';

import Header from './Header';

import Footer from './Footer';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} /> 

          <Route path="/login" element={<Login />} />
          
          <Route path="/festivals" element={<FestivalList />} />
          <Route path="/contest" element={<ContestSubmission />} />
          <Route path="/notices" element={<NoticeBoard />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/customize-festival' element={<CustomizeFestival />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

