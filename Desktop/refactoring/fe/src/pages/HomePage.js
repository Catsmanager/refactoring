import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; 
import festivalImage1 from '../img/festival1.png';
import festivalImage2 from '../img/festival1.png';
import festivalImage3 from '../img/festival1.png';

function HomePage() {
    // 진행 중인 축제 데이터를 상태로 관리
    const [festivals, setFestivals] = useState([]);

    // 축제 데이터를 가져오는 useEffect
    useEffect(() => {
      const fetchFestivals = async () => {
        //api 호출코드
        const data = [
          { id: 1, title: "봄 축제", description: "화려한 봄 축제입니다.", image: festivalImage1 },
          { id: 2, title: "여름 축제", description: "뜨거운 여름 축제를 즐겨보세요.", image: festivalImage2 },
          { id: 3, title: "가을 축제", description: "가을 풍경을 배경으로 즐길 수 있는 축제입니다.", image: festivalImage3 },
        ];
        setFestivals(data);
      };

      fetchFestivals();
    }, []); // 빈 배열을 넣어서 컴포넌트가 처음 마운트될 때 한 번만 호출

  return (
    <div className="homepage-container">
      {/* 축제 배너 - 진행 중인 축제 */}
      <header className="text-center py-5 bg-light">
        <div className="container">
        <h1 className="display-4" style={{ fontFamily: 'establishRoomNo703OTF, sans-serif' }}>
            축제를 제 맛대로
        </h1>
          <p className="lead">여기에서 다양한 축제 정보를 확인하고 커스터마이징 할 수 있습니다.</p>
        </div>

        {/* 진행 중인 축제 배너 - 카루셀 */}
        <div id="festivalCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#festivalCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#festivalCarousel" data-slide-to="1"></li>
            <li data-target="#festivalCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={festivalImage1} className="d-block w-100" alt="Festival 1" />
              <div className="carousel-caption d-none d-md-block">
                <h5>봄 축제</h5>
                <p>화려한 봄 축제를 즐겨보세요.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={festivalImage2} className="d-block w-100" alt="Festival 2" />
              <div className="carousel-caption d-none d-md-block">
                <h5>여름 축제</h5>
                <p>여름의 열기를 느껴보세요.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={festivalImage3} className="d-block w-100" alt="Festival 3" />
              <div className="carousel-caption d-none d-md-block">
                <h5>가을 축제</h5>
                <p>아름다운 가을 축제를 만끽하세요.</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#festivalCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">이전</span>
          </a>
          <a className="carousel-control-next" href="#festivalCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">다음</span>
          </a>
        </div>
      </header>

      <section className="features text-center py-5">
        <div className="container">
          <div className="row">
            {/* 기존에 있던 코드 */}
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
            <div className="col-lg-12">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">축제를 직접 커스터마이징하고 싶나요?</h5>
                  <p className="card-text">여기를 클릭하여 당신만의 축제를 만들어보세요!</p>
                  <Link to="/customize-festival" className="btn btn-success">축제 커스터마이징 하기</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 진행 중인 축제 목록 Section */}
      <section className="festivals-section py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">진행 중인 축제</h2>
          <div className="row">
            {festivals.map(festival => (
              <div className="col-lg-4 col-md-6 mb-4" key={festival.id}>
                <div className="card festival-card">
                  <img src={festival.image} className="card-img-top" alt={festival.title} />
                  <div className="card-body">
                    <h5 className="card-title">{festival.title}</h5>
                    <p className="card-text">{festival.description}</p>
                    <Link to={`/festivals/${festival.id}`} className="btn btn-primary">자세히 보기</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

