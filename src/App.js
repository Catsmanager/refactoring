import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup'

import HomePage from './pages/HomePage';

import FestivalList from './pages/FestivalList';
import FestivalPage from './pages/FestivalPage';

import NoticeBoard from './pages/NoticeBoard';

import ContestSubmission from './pages/ContestSubmission';
import CustomizeFestival from './pages/CustomizeFestival';

import Mypage from './pages/MyPage';

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
          <Route path="/festivals/:id" element={<FestivalPage/>}/>

          <Route path="/contest/:id" element={<ContestSubmission />} />

          <Route path="/notices" element={<NoticeBoard />} />

          <Route path="/mypage" element={<Mypage/>}/>
          
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/customize-festival' element={<CustomizeFestival />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

