import React, { useState } from 'react';
import { FaBars, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar }) {
  const [incidentSubmenuOpen, setIncidentSubmenuOpen] = useState(false);

  const toggleIncidentSubmenu = () => {
    setIncidentSubmenuOpen(!incidentSubmenuOpen);
  };

  return (
    <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isOpen ? 'toggled' : ''}`} id="accordionSidebar">
      {/* Sidebar Brand */}
      <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <FaBars onClick={toggleSidebar} className="text-white" />
        </div>
        <div className="sidebar-brand-text mx-3">Pothole Oracle</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      {/* Sidebar Menu Items */}
      <li className="nav-item">
        <Link to="/map-a" className="nav-link">
          <i className="fas fa-map-marker-alt"></i>
          <span>A</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/map-b" className="nav-link">
          <i className="fas fa-map-marker-alt"></i>
          <span>B</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/map-c" className="nav-link">
          <i className="fas fa-map-marker-alt"></i>
          <span>C</span>
        </Link>
      </li>

      {/* Submenu Example */}
      <li className="nav-item">
      <a
               className={`nav-link ${incidentSubmenuOpen ? '' : 'collapsed'}`}
               href="#"
               onClick={toggleIncidentSubmenu}
               aria-expanded={incidentSubmenuOpen}
              aria-controls="collapseIncident"
        >

          <span>사건 목록</span>

          {/* 토글 버튼 아이콘 */}
          <span className="ml-auto" style={{ marginLeft: '10px', fontSize: '1.2rem', color: '#fff' }}>
            {incidentSubmenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </a>
        <div
          id="collapseIncident"
          className={`collapse ${incidentSubmenuOpen ? 'show' : ''}`}
          aria-labelledby="headingIncident"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Manage Incidents:</h6>
            <Link className="collapse-item" to="/incident-list" onClick={toggleSidebar}>
              확인
            </Link>
            <Link className="collapse-item" to="/incident-register" onClick={toggleSidebar}>
              등록
            </Link>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="btn btn-primary rounded-circle" onClick={toggleSidebar} >
        <FaBars />
        </button>
      </div>
    </ul>
  );
}

export default Sidebar;














