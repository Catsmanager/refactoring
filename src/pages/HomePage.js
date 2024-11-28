import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/HomePage.css";
import festivalImage1 from "../img/도봉옛길.png";
import festivalImage2 from "../img/라벤더.png";
import festivalImage3 from "../img/무등산.png";
import festivalImage4 from "../img/사랑과나눔.png";
import festivalImage5 from "../img/세계인.png";
import festivalImage6 from "../img/수제맥주.png";
import festivalImage7 from "../img/앞산.png";
import festivalImage8 from "../img/앨리스.png";
import festivalImage9 from "../img/약령시.png";
import festivalImage10 from "../img/여름꽃.png";

function HomePage() {
  // 진행 중인 축제 데이터를 상태로 관리
  const [festivals, setFestivals] = useState([]);

  // 축제 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchFestivals = async () => {
      //api 호출코드
      const data = [
        { id: 1, image: festivalImage1 },
        { id: 2, image: festivalImage2 },
        { id: 4, image: festivalImage4 },
        { id: 5, image: festivalImage5 },
      ];
      setFestivals(data);
    };

    fetchFestivals();
  }, []); // 빈 배열을 넣어서 컴포넌트가 처음 마운트될 때 한 번만 호출

  return (
    <div className="homepage-container">
      {/* 축제 배너 - 진행 중인 축제 */}
      <header className="text-center py-5 bg-light">
        {/* 진행 중인 축제 배너 - 카루셀 */}
        <div
          id="festivalCarousel"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#festivalCarousel"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#festivalCarousel" data-slide-to="1"></li>
            <li data-target="#festivalCarousel" data-slide-to="2"></li>
            <li data-target="#festivalCarousel" data-slide-to="3"></li>
            <li data-target="#festivalCarousel" data-slide-to="4"></li>
            <li data-target="#festivalCarousel" data-slide-to="5"></li>
            <li data-target="#festivalCarousel" data-slide-to="6"></li>
            <li data-target="#festivalCarousel" data-slide-to="7"></li>
            <li data-target="#festivalCarousel" data-slide-to="8"></li>
            <li data-target="#festivalCarousel" data-slide-to="9"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={festivalImage1}
                className="d-block w-100"
                alt="Festival 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage2}
                className="d-block w-100"
                alt="Festival 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage3}
                className="d-block w-100"
                alt="Festival 3"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage4}
                className="d-block w-100"
                alt="Festival 4"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage5}
                className="d-block w-100"
                alt="Festival 5"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage6}
                className="d-block w-100"
                alt="Festival 6"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage7}
                className="d-block w-100"
                alt="Festival 7"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage8}
                className="d-block w-100"
                alt="Festival 8"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage9}
                className="d-block w-100"
                alt="Festival 9"
              />
            </div>
            <div className="carousel-item">
              <img
                src={festivalImage10}
                className="d-block w-100"
                alt="Festival 10"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#festivalCarousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">이전</span>
          </a>
          <a
            className="carousel-control-next"
            href="#festivalCarousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">다음</span>
          </a>
        </div>
      </header>

      <section className="features text-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm border-0 hover-effect">
                <div className="card-body">
                  <h5 className="card-title mb-3 text-primary custom-font">
                    축제 목록 보기
                  </h5>
                  <p className="card-text text-muted">
                    다양한 축제 정보를 확인해보세요.
                  </p>
                  <Link
                    to="/festivals"
                    className="btn btn-outline-primary mt-3"
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm border-0 hover-effect">
                <div className="card-body">
                  <h5 className="card-title mb-3 text-primary custom-font">
                    공지사항 보기
                  </h5>
                  <p className="card-text text-muted">
                    최근 공지사항을 확인하세요.
                  </p>
                  <Link to="/notices" className="btn btn-outline-primary mt-3">
                    자세히 보기
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 mb-4">
              <div className="card shadow-sm border-0 hover-effect">
                <div className="card-body">
                  <h5 className="card-title mb-3 text-primary custom-font">
                    축제를 직접 커스터마이징
                  </h5>
                  <p className="card-text text-muted">
                    나만의 축제를 만들어보세요!
                  </p>
                  <Link
                    to="/customize-festival"
                    className="btn btn-outline-success mt-3"
                  >
                    커스터마이징 하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 진행 중인 축제 목록 Section */}
      {/* 진행 중인 축제 목록 Section */}
      <section className="festivals-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">마감임박 축제</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            className="festival-swiper"
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {festivals.map((festival) => {
              const today = new Date();
              const deadline = new Date(festival.deadline); // 마감일 데이터
              const diffDays = Math.ceil(
                (deadline - today) / (1000 * 60 * 60 * 24)
              ); // D-Day 계산

              return (
                <SwiperSlide key={festival.id}>
                  <div className="festival-card shadow-sm rounded overflow-hidden">
                    <img
                      src={festival.image}
                      className="card-img-top img-fluid"
                      alt={festival.title}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body p-3">
                      <h5 className="card-title text-truncate">
                        {festival.title}
                      </h5>
                      <p className="card-text text-muted text-truncate">
                        {festival.description}
                      </p>
                      <Link
                        to={`/festivals/${festival.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        자세히 보기
                      </Link>
                      <p className="text-danger mt-3 mb-0 fw-bold custom-font">
                        마감까지 D-{diffDays > 0 ? diffDays : "마감"}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
