import React, { useEffect, useState } from 'react';
import { FiClock, FiCheckCircle, FiXCircle, FiTruck, FiInfo } from 'react-icons/fi';
import './TrackingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestWithDispatches } from '../../services/ordersService';


const TrackingPage = () => {
    const dispatch = useDispatch();
    const {requestsList}=useSelector((state)=>state.selldevice);
    const {selectedCourier}=useSelector((state)=>state.orders);
    const [showModal, setShowModal] = useState(false);
    const handleViewCourier = (reqId) => {
       dispatch(getRequestWithDispatches(reqId));
       setShowModal(true);
    };
    return (
        <div className="tracking-wrapper">
            <div className="tracking-header">
                <h2>Requests Status</h2>
                <p>Track your submitted requests and courier updates</p>
            </div>
            
            <div className="table-scroll-container">
                <table className="modern-track-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Device</th>
                            <th>Submission Date</th>
                            <th>Status</th>
                            <th>Action / Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                       {requestsList && requestsList.map((req) => (
                        <tr key={req.RequestID}>
                            <td className="id-column">#{req.RequestID}</td>
                            <td className="column">{req.DeviceItem}</td>
                            <td className="date-column">{req.SubmissionDate?.split('T')[0]}</td>   
                            
                            {/* عمود الحالة (Status) */}
                            <td>
                                {req.RequestStatus === 0 && (
                                    <div className="status-label pending">
                                        <FiClock /> <span>Under Review</span>
                                    </div>
                                )}
                                {req.RequestStatus === 1 && (
                                    <div className="status-label accepted">
                                        <FiCheckCircle /> <span>Accepted</span>
                                    </div>
                                )}
                                {req.RequestStatus === 2 && (
                                    <div className="status-label rejected">
                                        <FiXCircle /> <span>Rejected</span>
                                    </div>
                                )}
                                {req.RequestStatus === 3 && (
                                    <div className="status-label received">
                                        <FiCheckCircle /> <span>Items Received</span>
                                    </div>
                                )}
                                {req.RequestStatus === 4 && (
                                    <div className="status-label completed-final">
                                        <FiCheckCircle /> <span>Completed</span>
                                    </div>
                                )}
                            </td>
                            <td className="action-column"> 
                                {req.RequestStatus === 0 && (
                                    <span className="waiting-text">Awaiting decision</span>
                                )}
                                {req.RequestStatus === 1 && (
                                    <div className="action-buttons-gap">
                                        <button className="btn-courier-action" onClick={() => handleViewCourier(req.RequestID)}>
                                            <FiTruck /> Courier
                                        </button> 
                                    </div>
                                )}
                                {req.RequestStatus === 2 && (
                                    <div className="rejection-note-box">
                                        <FiInfo /> <span>Items damaged or model mismatch.</span>
                                    </div>
                                )}
                                {req.RequestStatus === 3 && (
                                    <div className="points-waiting-box">
                                        <FiClock className="pulse-icon" />
                                        <div className="points-text">
                                            <strong>Received!</strong>
                                            <span>Points pending admin review</span>
                                        </div>
                                    </div>
                                )}
                               {req.RequestStatus === 4 && (
                                    <div className="status-points-simple">
                                        <span className="points-msg"> Points added!</span>
                                       <button 
                                            className="btn-mini-profile" 
                                            onClick={() => window.location.href = '/userprofile'}
                                        >
                                            View
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="simple-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="simple-modal-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-teal">
                            <h4><FiTruck /> Courier Information</h4>
                            <span onClick={() => setShowModal(false)} className="close-x">&times;</span>
                        </div>
                        <div className="modal-body-content">
                          {selectedCourier && selectedCourier.map((c,index)=>
                          <>
                            <div className="info-box">
                                <label>Representative Name</label>
                                <p>{c?.CourierName}</p>
                            </div>
                            <div className="info-box">
                                <label>Phone Number</label>
                                <p>{c?.CourierPhone}</p>
                            </div>
                            <hr className="modal-divider" />
                            <div className="info-box">
                                <label>Pickup Address</label>
                                <p>{c?.ShippingAddress}</p>
                            </div>
                            <div className="info-box">
                                <label>Estimated Date</label>
                                <p>{c?.PickUpDate.split('T')[0]}</p>
                            </div>
                            <div className="info-box">
                                <label>Expected Time To Arrive</label>
                                <p>{c?.ArrivalTime.split('T')[1]}</p>
                            </div>
                        </>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackingPage;