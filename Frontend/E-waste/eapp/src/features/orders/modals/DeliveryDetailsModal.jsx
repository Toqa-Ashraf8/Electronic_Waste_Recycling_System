import React, { useState } from 'react';
import './DeliveryDetailsModal.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaShippingFast, FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setDispatchData, toggleCourierModal } from '../../../redux/orders/ordersSlice';
import { fetchOrders, saveDispatch } from '../../../services/ordersService';
import { toast } from 'react-toastify';

const DeliveryDetailsModal = () => {
    const {dispatchData}=useSelector((state)=>state.orders);
    const dispatch = useDispatch();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        dispatch(setDispatchData({[name]:value}));
    }
const handleSave=async()=>{
    try {
        const result=await dispatch(saveDispatch(dispatchData)).unwrap();
        if(result.saved){
            toast.success("Courier Assigned!",{
                theme:'colored',
                position:'top-right'
            })
         dispatch(fetchOrders());
        }
    } catch (error) {
        dispatch(toggleCourierModal(false));
    }
}
    return (
        <div className="dlv-modal-overlay">
            <div className="dlv-modal-container">
                <div className="dlv-modal-header">
                    <h3 className="dlv-header-title">LOGISTICS HUB</h3>
                    <span className='dlv-btn-close' 
                    onClick={() => dispatch(toggleCourierModal(false))}>&times;</span>
                </div>

                <div className="dlv-modal-body">
                    <div className="dlv-info-card">
                        <div className="dlv-info-header">
                            <FaInfoCircle /> <span>PickUp Details</span>
                        </div>
                        <div className="dlv-info-row">
                            <div className="dlv-info-item">
                                <label><FaMapMarkerAlt />PickUp Address</label>
                                <p>{dispatchData.ShippingAddress}</p>
                            </div>
                            <div className="dlv-info-item">
                                <label><FaCalendarAlt />PickUp Date</label>
                                <p>{dispatchData.PickUpDate.split('T')[0]}</p>
                            </div>
                        </div>
                    </div>

                    <div className="dlv-section-title">
                         <FaShippingFast /> Assign Representative
                    </div>

                    <div className="dlv-field-group">
                        <label className="dlv-label">Courier Name</label>
                        <select 
                            name='CourierName'
                            className="form-select dlv-input"
                            value={dispatchData.CourierName}
                            onChange={handleChange}
                        >
                            <option value="-1">- Select Courier -</option>
                            <option value="Ahmed Mohamed">Ahmed Mohamed</option>
                            <option value="Sayed Ali">Sayed Ali</option>
                        </select>
                    </div>

                    <div className="dlv-field-group">
                        <label className="dlv-label">Phone Number</label>
                        <input 
                            type="text"
                            name='CourierPhone' 
                            className="form-control dlv-input" 
                            value={dispatchData.CourierPhone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="dlv-field-group">
                        <label className="dlv-label">Expected Arrival Time</label>
                        <input 
                            type="datetime-local"
                            name='ArrivalTime'
                            className="form-control dlv-input" 
                            value={dispatchData.ArrivalTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="dlv-modal-footer">
                    <button 
                    className='btn' 
                    style={{ color: '#fff', backgroundColor: '#03071e', padding: '10px 30px' }}
                    onClick={()=>handleSave()}
                    >Confirm Dispatch</button>
                    
                    <button 
                        className='btn btn-danger'
                        onClick={() => dispatch(toggleCourierModal(false))}
                    >Close</button>
                </div>
            </div>
        </div>
    );
}

export default DeliveryDetailsModal;