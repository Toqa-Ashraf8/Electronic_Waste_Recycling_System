import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { IoHeadsetOutline } from "react-icons/io5";
import moment from 'moment'; 
import './ContactUs.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../services/companyProfileSevice';
import { formatTime } from '../../components/formatTime';

const ContactUs = () => {
     const { contacts } = useSelector((state) => state.companyProfile);
     const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchContacts());
    },[])
  return (
    <div className="contact-page-hud">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <div className="contact-card-hud animate__animated animate__fadeIn">
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
            {contacts && contacts.map((contact,index)=>(
            <div className="contact-items-wrapper" key={contact.ContactID || index}>
                <a href={`tel:${contact.PhoneSupport?.replace(/[^\d+]/g, '')}`} className="contact-item-hud">
                  <FaPhoneAlt className="contact-item-icon" />
                  <div className="contact-details">
                    <span className="contact-label">Phone Support</span>
                    <span className="contact-value">{contact.PhoneSupport}</span>
                    <small className="contact-note">
                      ({formatTime(contact.StartHour)} - {formatTime(contact.EndHour)})
                    </small>
                  </div>
                </a>
                <a href={`mailto:${contact.Email}`} className="contact-item-hud">
                  <FaEnvelope className="contact-item-icon" />
                  <div className="contact-details">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">{contact.Email}</span>
                  </div>
                </a>
                
                <a href={`https://wa.me/${contact.WhatsAppNumber.replace(/[^\d+]/g, '')}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-item-hud">
                  <FaWhatsapp className="contact-item-icon" />
                  <div className="contact-details">
                    <span className="contact-label">WhatsApp</span>
                    <span className="contact-value">{contact.WhatsAppNumber}</span>
                  </div>
                </a>
              </div>
        ))}
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