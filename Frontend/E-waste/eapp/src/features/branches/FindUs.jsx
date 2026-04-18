import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'animate.css'; 
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi'; 
import { FaMapMarkedAlt } from 'react-icons/fa';
import './FindUs.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../services/companyProfileSevice';
import { BranchCard } from './BranchCard';

const FindUs = () => {
  const {branches}=useSelector((state)=>state.companyProfile);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(fetchBranches())
  },[])
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
          {branches.map((branch, index) => (
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