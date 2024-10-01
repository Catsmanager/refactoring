import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; 

function HomePage() {
  return (
    <div className="homepage-container">
      {/* Bookly 스타일 적용 */}
      <header className="text-center py-5 bg-light">
        <div className="container">
          <h1 className="display-4">축제를 제 맞대로</h1>
          <p className="lead">여기에서 다양한 축제 정보를 확인하고 커스터마이징 할 수 있습니다.</p>
        </div>
      </header>

      <section className="features text-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">축제 목록 보기</h5>
                  <p className="card-text">다양한 축제 정보를 확인해보세요.</p>
                  <Link to="/festivals" className="btn btn-primary">자세히 보기</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">공모전 참가</h5>
                  <p className="card-text">다양한 공모전에 참가해보세요.</p>
                  <Link to="/contest" className="btn btn-primary">참가하기</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">공지사항 보기</h5>
                  <p className="card-text">최근 공지사항을 확인하세요.</p>
                  <Link to="/notices" className="btn btn-primary">공지사항</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">로그인</h5>
                  <p className="card-text">로그인하여 더 많은 정보를 확인하세요.</p>
                  <Link to="/login" className="btn btn-primary">로그인</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">회원가입</h5>
                  <p className="card-text">아직 회원이 아니신가요? 지금 가입하세요.</p>
                  <Link to="/signup" className="btn btn-primary">회원가입</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
