import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { IoHeadsetOutline } from "react-icons/io5"; 
import './ContactUs.css'; 

const ContactUs = () => {
  return (
    <div className="contact-page-hud">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <div className="contact-card-hud animate__animated animate__fadeIn">
              {/* Decorative corner elements */}
              <div className="corner corner-top-left"></div>
              <div className="corner corner-top-right"></div>
              <div className="corner corner-bottom-left"></div>
              <div className="corner corner-bottom-right"></div>

              <div className="card-header-hud">
                <IoHeadsetOutline className="card-icon-hud" />
                <h1 className="card-title-hud">SUPPORT HUB</h1>
                <p className="card-subtitle-hud">
                  For any inquiries or technical issues, we're here to help you through the following channels:
                </p>
              </div>

              <div className="contact-items-wrapper">
                <a href="tel:01234567890" className="contact-item-hud">
                  <FaPhoneAlt className="contact-item-icon" />
                  <div className="contact-details">
                    <span className="contact-label">Phone Support</span>
                    <span className="contact-value">0123-456-7890</span>
                    <small className="contact-note">(8:00 AM - 5:00 PM)</small>
                  </div>
                </a>
                <a href="mailto:support@e-vive.com" className="contact-item-hud">
                  <FaEnvelope className="contact-item-icon" />
                  <div className="contact-details">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">support@e-vive.com</span>
                  </div>
                </a>
                
                <a href="https://wa.me/201001234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-item-hud">
                  <FaWhatsapp className="contact-item-icon" />
                  <div className="contact-details">
                    <span className="contact-label">WhatsApp</span>
                    <span className="contact-value">+20 100 123 4567</span>
                  </div>
                </a>
              </div>

              <div className="card-footer-hud">
                <p>Your inquiries will be addressed as promptly as possible.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;