import React, { useEffect, useState } from "react";
import "./Orders.css";
import { FaClock, FaHistory } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux'
import { 
  fetchOrders, 
  fetchRejectedOrders, 
  fetchRequests 
} from "../../services/ordersService";
import OrderDetailsModal from "./modals/OrderDetailsModal";
import { 
  setImageRowIndex, 
  setOrder, 
  toggleconfirmReqModal, 
  toggleOrdersImgModal,
  toggleRejectReqModal,
} from "../../redux/orders/ordersSlice";
import { variables } from "../../components/variables";
import ConfirmRequestModal from "./modals/ConfirmRequestModal";
import RejectRequestModal from "./modals/RejectRequestModal";
import { CompletedOrdersTable } from "./CompletedOrdersTable";
import { RejectedOrdersTable } from "./RejectedOrdersTable";
import { PendingOrdersTable } from "./PendingOrdersTable";
import DeliveryDetailsModal from "./modals/DeliveryDetailsModal";
import ConfirmRecievingModal from "./modals/ConfirmRecievingModal";
import SendPointsModal from "./modals/SendPointsModal";
const Orders = () => {
    const [view, setView] = useState("pending");
    const {
      requests,
      isOrdersImgsModalOpen,
      isConfirmOrderModalOpen,
      isRejectOrderModalOpen,
      ordersList,
      rejectedList,
      isCourierModalOpen,
      isConfirmRecieveModal,
      isSendPointsModalOpen
}=useSelector((state)=>state.orders);
    const dispatch=useDispatch();
   
const zoomDeviceImage=(index,status)=>{
  dispatch(setImageRowIndex({ index: index, status: status }));
  dispatch(toggleOrdersImgModal(true));
}
const handleOrderApprove=(index)=>{
  const orderRow=requests[index];
  dispatch(toggleconfirmReqModal(true));
  dispatch(setOrder({Action:"Approve",orderRow:orderRow,reqId:orderRow.RequestID}));
}

const handleOrderReject=(index)=>{
  const orderRow=requests[index];
  dispatch(toggleRejectReqModal(true));
  dispatch(setOrder({Action:"Reject",orderRow:orderRow,reqId:orderRow.RequestID}));
}

const completedOrders=()=>{
  setView("history");
  dispatch(fetchOrders());
}
const rejectedOrders=()=>{
  setView("rejected");
  dispatch(fetchRejectedOrders());
}

useEffect(() => {
   dispatch(fetchRequests());
},[dispatch]);

  return (
    <div className="orders-manager-container">
      {isOrdersImgsModalOpen && <OrderDetailsModal/>}
      {isConfirmOrderModalOpen && <ConfirmRequestModal/>}
      {isRejectOrderModalOpen && <RejectRequestModal/>}
      {isCourierModalOpen && <DeliveryDetailsModal/>}
      {isConfirmRecieveModal && <ConfirmRecievingModal/>}
      {isSendPointsModalOpen && <SendPointsModal/>}
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
          className={`btn-toggle ${view === "history" ? "active" : ""}`} 
          onClick={() => completedOrders()}>
            <FaHistory /> History Log
          </button>
            <button className={`btn-toggle ${view === "rejected" ? "active" : ""}`} 
            onClick={() => rejectedOrders()}
            >
            <FaHistory /> 
            Rejected 
          </button>
        </div>
      </div>
      {view==="pending" && 
        <PendingOrdersTable
         handleOrderApprove={handleOrderApprove}
         handleOrderReject={handleOrderReject}
         requests={requests}
         zoomDeviceImage={zoomDeviceImage} 
         variables={variables}
        />
      }

     {view==="history" && 
        <CompletedOrdersTable 
        ordersList={ordersList} 
        zoomDeviceImage={zoomDeviceImage} 
        variables={variables} 
      />
    } 
     {view==="rejected" && 
       <RejectedOrdersTable 
        rejectedList={rejectedList} 
        zoomDeviceImage={zoomDeviceImage}
        variables={variables}
      />
    }
    </div>
  );
};

export default Orders;