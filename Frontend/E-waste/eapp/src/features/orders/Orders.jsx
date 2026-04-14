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
import DeliveryDetailsModal from "../../components/modals/DeliveryDetailsModal";
import { variables } from "../../components/variables";
import ConfirmRequestModal from "./modals/ConfirmRequestModal";
import RejectRequestModal from "./modals/RejectRequestModal";
import { CompletedOrdersTable } from "./CompletedOrdersTable";
import { RejectedOrdersTable } from "./RejectedOrdersTable";
import { PendingOrdersTable } from "./PendingOrdersTable";
const Orders = () => {
    const [view, setView] = useState("pending");
    const {
      requests,
      isOrdersImgsModalOpen,
      isOrdersAddressModalOpen,
      isConfirmOrderModalOpen,
      isRejectOrderModalOpen,
      ordersList,
      rejectedList
}=useSelector((state)=>state.orders);
    const dispatch=useDispatch();
   
const zoomDeviceImage=(index)=>{
  dispatch(setImageRowIndex(index));
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
  setView("completed");
  dispatch(fetchOrders());
}
const rejectedOrders=()=>{
  setView("rejected");
  dispatch(fetchRejectedOrders());
}


useEffect(() => {
  const loadData=async()=>{
      await Promise.all([
        dispatch(fetchRequests()).unwrap(),
      ]);
  }
  loadData();
}, [dispatch]);


  return (
    <div className="orders-manager-container">
      {isOrdersImgsModalOpen && <OrderDetailsModal/>}
      {isOrdersAddressModalOpen && <DeliveryDetailsModal/>}
      {isConfirmOrderModalOpen && <ConfirmRequestModal/>}
      {isRejectOrderModalOpen && <RejectRequestModal/>}
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
          onClick={() => completedOrders()}>
            <FaHistory /> Completed Log
          </button>
            <button className={`btn-toggle ${view === "rejected" ? "active" : ""}`} 
            onClick={() => rejectedOrders()}
            >
            <FaHistory /> 
            Rejected Log
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

     {view==="completed" && 
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