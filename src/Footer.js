import React from 'react';
import './footer.css'; // Footer 스타일 적용

function Footer() {
  return (
    <footer className="footer-container bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* 로고 및 설명 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5>My Festival</h5>
            <p>축제에 대한 최신 정보를 확인하고 다양한 활동에 참여해보세요!</p>
          </div>
          
          {/* 빠른 링크 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
              <li><a href="/faq" className="text-white">FAQ</a></li>
            </ul>
          </div>

          {/* 소셜 미디어 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" className="text-white me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="text-white me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 My Festival. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
