import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // 프로필 아이콘 추가
import Login from './pages/Login';
import Signup from './pages/Signup';

function Header() {
  const [modalType, setModalType] = useState('login');
  const navigate = useNavigate();

  const openModal = (type) => {
    setModalType(type);
    // Bootstrap의 모달을 열기 위해 직접 조작
    window.$('#authModal').modal('show');
  };

  return (
    <header className="header-container">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div className="logo" onClick={() => navigate('/')}>MyApp</div>
        <div>
          <button
            className="btn btn-primary mr-2"
            onClick={() => openModal('login')}
          >
            로그인
          </button>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => openModal('signup')}
          >
            회원가입
          </button>
          <FaUserCircle
            className="profile-icon"
            size={30}
            onClick={() => navigate('/mypage')}
            style={{ cursor: 'pointer', color: '#007bff', marginLeft: '10px' }}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="authModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="authModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="authModalLabel">
                {modalType === 'login' ? '로그인' : '회원가입'}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {modalType === 'login' ? <Login /> : <Signup />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;