import React, { useEffect, useState } from "react";
import "./Orders.css";
import { 
    FaCheck, 
    FaTimes, 
    FaTruck, 
    FaCoins, 
    FaBoxOpen, 
    FaClock, 
    FaHistory 
} from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import {useSelector,useDispatch} from 'react-redux'
import { fetchRequests } from "../../services/ordersService";
import OrderDetailsModal from "./modals/OrderDetailsModal";
import { setImageRowIndex, toggleconfirmReqModal, toggleOrdersImgModal } from "../../redux/orders/ordersSlice";
import DeliveryDetailsModal from "../../components/modals/DeliveryDetailsModal";
import { variables } from "../../components/variables";
import ConfirmRequestModal from "./modals/ConfirmRequestModal";
const Orders = () => {
    const [view, setView] = useState("pending");
    const {
      requests,
      isOrdersImgsModalOpen,
      isOrdersAddressModalOpen,
      isConfirmOrderModalOpen
}=useSelector((state)=>state.orders);
    const dispatch=useDispatch();
   
const zoomDeviceImage=(index)=>{
  dispatch(setImageRowIndex(index));
  dispatch(toggleOrdersImgModal(true));
}


useEffect(()=>{
    dispatch(fetchRequests());
},[dispatch])

  return (
    <div className="orders-manager-container">
      {isOrdersImgsModalOpen && <OrderDetailsModal/>}
      {isOrdersAddressModalOpen && <DeliveryDetailsModal/>}
      {isConfirmOrderModalOpen && <ConfirmRequestModal/>}
      <div className="orders-header">
        <h2 className="title-modern">Order 
            <span className="highlight">Workflow</span>
        </h2>
        <div className="toggle-buttons">
          <button 
          className={`btn-toggle ${view === "pending" ? "active" : ""}`} 
          onClick={() => setView("pending")}>
            <FaClock /> Active Orders
          </button>
          <button 
          className={`btn-toggle ${view === "completed" ? "active" : ""}`} 
          onClick={() => setView("completed")}>
            <FaHistory /> Completed Log
          </button>
            <button className={`btn-toggle ${view === "history" ? "active" : ""}`} 
            onClick={() => setView("history")}
            >
            <FaHistory /> 
            History Log
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="bootstrap-table">
          <thead>
            <tr>
              <th>ReqID</th>
              <th>Customer</th>
              <th>Device</th>
              <th>Condition/Quality</th>
              <th>Expected Points</th>
              <th style={{width:'100px'}}> Image</th>
              <th>PickUp Date</th>
              <th>Current Status</th>
              <th>Actions / Steps</th> 
            </tr>
          </thead>
          <tbody>
         {requests && requests.map((req,index)=>
              <tr key={req.RequestID || index}>
                <td>{req.RequestID}</td>
                <td><strong>{req.UserName}</strong></td>
                <td>{req.DeviceItem}</td>
                <td>
                  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <span>{req.DeviceCondition}/</span>
                    <span>{req.DeviceQuality}</span>
                  </div>
                  </td>
                <td>
                  <div style={{display:'flex',gap:'5px',justifyContent:'center',alignItems:'center'}}>
                  <span>{req.Points}</span>
                  <span >
                    <FaStar size={20} color="#fbff03" style={{marginTop:'-3px'}}/>
                    </span>
                  </div>
                  </td>
                <td>
                  <div className="img-container" 
                  onClick={()=>zoomDeviceImage(index)}>
                    <img 
                    src={variables.DEVICEIMG_API+req.DeviceImagePath}
                    alt=""
                   className="dev-img"
                   />
                  </div>
                
                </td>
                <td>
                 {req.PickUpDate.split('T')[0]}
                 </td>
                <td>
                <div>
                   {req.RequestStatus === 0 && (
                        <span style={{
                            backgroundColor: '#fffbeb',
                            color: '#b45309',           
                            padding: '4px 12px',
                            borderRadius: '12px',      
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            border: '1px solid #fef3c7',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                            }}>
                            <span style={{ 
                                width: '6px', 
                                height: '6px', 
                                backgroundColor: '#f59e0b', 
                                borderRadius: '50%' 
                            }}></span> 
                            Pending
                            </span>
                            )}
                        </div>
                        </td>
                <td>
                  <div className="workflow-actions">
                    {req.RequestStatus === 0 && (
                      <div className="order-actions-wrapper">
                      <button 
                      className="btn-hud btn-accept" 
                      title="Accept Order"
                      onClick={()=>dispatch(toggleconfirmReqModal(true))}
                      >
                        <FaCheck />
                      </button>
                      <button className="btn-hud btn-reject" title="Reject Order">
                        <FaTimes />
                      </button>
                    </div>
                    )} 
                    </div>
                    </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;