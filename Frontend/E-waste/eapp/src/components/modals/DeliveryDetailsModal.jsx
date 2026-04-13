import React, { useState } from 'react';
import './DeliveryDetailsModal.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaShippingFast } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggleOrdersAdrModal } from '../../redux/orders/ordersSlice';

const DeliveryDetailsModal = ({  deliveryData, onAssignCourier }) => {
    const [showCourierForm, setShowCourierForm] = useState(false);
    const [courierName, setCourierName] = useState('');
    const [courierPhone, setCourierPhone] = useState('');
const dispatch=useDispatch();

    const handleSubmit = () => {
        onAssignCourier(deliveryData.OrderID, { courierName, courierPhone });
        onClose();
    };
    return (
        <div className="LogiModalOverlay">
            <div className="LogiModalContainer">
                {/* Header */}
                <div className="LogiHeader">
                    <h3>LOGISTICS HUB</h3>
                    <span className='LogiBtnClose'   
                    onClick={()=>dispatch(toggleOrdersAdrModal(false))}>&times;</span>
                </div>
                <div className="LogiBody">      
                        <div className="LogiFormSection">
                            <h4 className="LogiFormTitle"><FaShippingFast className="me-2" /> 
                            Representative Details
                            </h4>
                            
                            <div className="LogiInputGroup">
                                <label>Courier Name</label>
                                <input 
                                    type="text" 
                                    className="LogiInput"
                                    placeholder="Enter full name"
                                    value={courierName}
                                    onChange={(e) => setCourierName(e.target.value)}
                                />
                            </div>
                            <div className="LogiInputGroup">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    className="LogiInput"
                                    placeholder="01xxxxxxxxx"
                                    value={courierPhone}
                                    onChange={(e) => setCourierPhone(e.target.value)}
                                />
                            </div>

                            <button className="LogiBtnSubmit">
                                Confirm & Dispatch
                            </button>
                        </div>
                
                </div>

                <div className="LogiFooter">
                    <button 
                    className='btn btn-danger LogiBtnCancel'
                    onClick={()=>dispatch(toggleOrdersAdrModal(false))}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeliveryDetailsModal;