import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'animate.css'; 
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi'; 
import { FaMapMarkedAlt } from 'react-icons/fa';
import './FindUs.css';

const branchesData = [
  { name: 'New Cairo Branch', 
    address: 'South 90th Street, 5th Settlement', 
    phone: '02-21234567', 
    timings: 'Daily from 9 AM to 10 PM', 
    mapLink: 'https://www.google.com/maps' 
},
  { name: 'Nasr City Branch', 
    address: 'Abbas El Akkad St., near City Stars', 
    phone: '02-27654321', 
    timings: 'Daily from 9 AM to 10 PM', 
    mapLink: 'https://www.google.com/maps' 
},
  { name: '6th of October Branch', 
    address: 'Al Motamayez District, Al-Hossary Square', 
    phone: '02-38123456', 
    timings: 'Daily from 10 AM to 11 PM', 
    mapLink: 'https://www.google.com/maps' 
},
 
];
const BranchCard = ({ branch, animationDelay }) => (
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
        <h3 className="branch-name">{branch.name}</h3>
      </div>
      <div className="branch-card-body">
        <div className="info-item">
          <FiMapPin className="info-icon" />
          <span>{branch.address}</span>
        </div>
        <div className="info-item">
          <FiPhone className="info-icon" />
          <span className="phone-number">{branch.phone}</span>
        </div>
        <div className="info-item">
          <FiClock className="info-icon" />
          <span>{branch.timings}</span>
        </div>
      </div>
      <div className="branch-card-footer">
        <a 
        href={branch.mapLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="map-button">
          View on Map
        </a>
      </div>
    </div>
  </Col>
);

const FindUs = () => {
  return (
    <div className="branches-page-hud">
      <Container>
        <div className="page-header text-center animate__animated animate__fadeInDown">
          <FaMapMarkedAlt className="page-icon" />
          <h1 className="page-title">OUR GLOBAL NETWORK</h1>
          <p className="page-subtitle">
            We are always close to you. Discover our nearest branch and visit us.
          </p>
        </div>
        <Row className="justify-content-center">
          {branchesData.map((branch, index) => (
            <BranchCard 
              key={index} 
              branch={branch} 
              animationDelay={`${index * 100}ms`}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default FindUs;