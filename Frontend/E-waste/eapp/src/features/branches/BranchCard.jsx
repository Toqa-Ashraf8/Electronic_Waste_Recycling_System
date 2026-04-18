import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi'; 
import { FaMapMarkedAlt } from 'react-icons/fa';
export const BranchCard = ({ branch, animationDelay }) => (
  <Col md={6} lg={4} 
  className="mb-4 d-flex align-items-stretch animate__animated animate__fadeInUp" 
  style={{ animationDelay }}>
    <div className="branch-card-hud">
        <div className="corner corner-top-left"></div>
        <div className="corner corner-top-right"></div>
        <div className="corner corner-bottom-left"></div>
        <div className="corner corner-bottom-right"></div>

      <div className="branch-card-header">
        <FiMapPin className="header-icon" />
        <h3 className="branch-name">{branch.BranchName}</h3>
      </div>
      <div className="branch-card-body">
        <div className="info-item">
          <FiMapPin className="info-icon" />
          <span>{branch.Location}</span>
        </div>
        <div className="info-item">
          <FiPhone className="info-icon" />
          <span className="phone-number">{branch.BranchPhone}</span>
        </div>
        <div className="info-item">
          <FiClock className="info-icon" />
          <span>{branch.WorkingHours}</span>
        </div>
      </div>
      <div className="branch-card-footer">
        <a 
        href={branch.MapLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="map-button">
          View on Map
        </a>
      </div>
    </div>
  </Col>
);
