import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './ContactSearchModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { fillContactForm, toggleSearchContactModal } from '../../../redux/companyProfile/companyProfileSlice';
import { fetchContacts } from '../../../services/companyProfileSevice';
import { formatTime } from '../../../components/formatTime';

const ContactSearchModal = () => {
    const { contacts } = useSelector((state) => state.companyProfile);
    const dispatch=useDispatch();


    useEffect(()=>{
        dispatch(fetchContacts());
        
    },[])
    return (
        <div className="cnt-modal-box">
            <div className="cnt-inner-card large-contact-modal">
                <div className="cnt-top-bar">
                    <span>Contacts Details</span>
                    <button className="brn-close-x" 
                     onClick={() => dispatch(toggleSearchContactModal(false))} >
                        <FiX />
                    </button>
                </div>
                <div className="cnt-content-area">
                    <table className="cnt-grid-table">
                        <thead>
                            <tr>
                                <th>Phone Support</th>
                                <th>Start Hour</th>
                                <th>End Hour</th>
                                <th>Email</th>
                                <th>WhatsApp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((person, index) => (
                                    <tr key={index} onClick={() => dispatch(fillContactForm(index))}>
                                        <td >{person.PhoneSupport}</td>
                                        <td className="cnt-name-bold">{formatTime(person.StartHour)}</td> 
                                        <td className="cnt-name-bold">{formatTime(person.EndHour)}</td>
                                        <td>{person.Email}</td>
                                        <td>{person.WhatsAppNumber}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="cnt-none">No contacts found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactSearchModal;