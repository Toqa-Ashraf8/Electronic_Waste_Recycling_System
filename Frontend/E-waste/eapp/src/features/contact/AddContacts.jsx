import React, { useEffect, useRef } from "react";
import { Save, BrushCleaning, Search, Trash } from 'lucide-react';
import './AddContacts.css';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { 
    resetContactForm, 
    setContactValues, 
    toggleDeleteContactModal, 
    toggleSearchContactModal 
} from "../../redux/companyProfile/companyProfileSlice";
import { saveContacts } from "../../services/companyProfileSevice";
import ContactSearchModal from "./modals/ContactSearchModal";
import DeleteContactModal from "./modals/DeleteContactModal"

function AddContacts() {
    const {
        contact,
        isSearchContactOpen,
        isDeleteContactOpen
}=useSelector((state)=>state.companyProfile);
    const dispatch = useDispatch();
    const contactNameRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
         dispatch(setContactValues({ [name]: value }));
    };

    const clearForm = () => {
        dispatch(resetContactForm());
        if(contactNameRef.current) contactNameRef.current.focus();
    };

    const saveContact = async () => {
          try {
            const result=await dispatch(saveContacts(contact)).unwrap();
            if(result.saved){
                toast.success("Data Saved Succesfully!",{
                    theme:'colored',
                    position:'top-right'
                })
            }
            else if(result.updated){
                toast.success("Data Updated Succesfully!",{
                    theme:'colored',
                    position:'top-right'
                })
            }
        } catch (error) {} 
    };

    useEffect(() => {
        if(contactNameRef.current) contactNameRef.current.focus();
    }, []);

    return (
        <div className="contact-mgmt-container">
            {isSearchContactOpen && <ContactSearchModal/>}
            {isDeleteContactOpen && <DeleteContactModal/>}
            <h5 className="contact-main-title">CONTACTS MANAGEMENT</h5>

            <div className="contact-card-wrapper animate__animated animate__fadeIn">
                <div className="contact-actions-sidebar">
                    <button 
                    className="contact-btn-tool" 
                    onClick={()=>clearForm()} 
                    title="Clear Form">
                        <BrushCleaning size={22} color="black" />
                    </button>
                    <button 
                    className="contact-btn-tool" 
                    onClick={()=>saveContact()} 
                    title="Save Contact">
                        <Save size={22} color="green" />
                    </button>
                    <button 
                    className="contact-btn-tool" 
                    onClick={() => dispatch(toggleDeleteContactModal(true))} 
                    title="Delete">
                        <Trash size={22} color="red" />
                    </button>
                    <button 
                    className="contact-btn-tool" 
                    onClick={() => dispatch(toggleSearchContactModal(true))} 
                    title="Search">
                        <Search size={22} color="blue" />
                    </button>
                </div>

                <div className="contact-master-section">
                    <div className="contact-stack-column">
                        
                        <div className="contact-input-group">
                            <label className="contact-label">Contact ID</label>
                            <input 
                                type="text" 
                                className="form-control contact-input-field"
                                name='ContactID'
                                value={contact.ContactID || 0}
                                disabled 
                            />
                        </div>

                        <div className="contact-input-group">
                            <label className="contact-label">Phone Support</label>
                            <input 
                                type="text" 
                                className="form-control contact-input-field"
                                name="PhoneSupport"
                                autoComplete="off"
                                ref={contactNameRef}
                                value={contact.PhoneSupport || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contact-input-group">
                            <label className="contact-label">Email Address</label>
                            <input 
                                type="email" 
                                className="form-control contact-input-field"
                                name="Email"
                                value={contact.Email || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contact-input-group">
                            <label className="contact-label"> WhatsApp Phone </label>
                            <input 
                                type="text" 
                                className="form-control contact-input-field"
                                name="WhatsAppNumber"
                                value={contact.WhatsAppNumber || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contact-input-group">
                            <label className="contact-label">Start Working Hour</label>
                            <input 
                                type="time" 
                                className="form-control contact-input-field"
                                name="StartHour"
                                value={contact.StartHour || ""}
                                onChange={handleChange}
                            />
                        </div>
                         <div className="contact-input-group">
                            <label className="contact-label">End Working Hour</label>
                            <input 
                                type="time" 
                                className="form-control contact-input-field"
                                name="EndHour"
                                value={contact.EndHour || ""}
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddContacts;