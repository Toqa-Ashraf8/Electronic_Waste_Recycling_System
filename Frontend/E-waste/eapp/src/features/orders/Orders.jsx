import React, { useEffect, useState } from "react";
import "./Orders.css";
import { FaClock, FaHistory ,FaSearch } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux'
import { 
  fetchOrders, 
  fetchRejectedOrders, 
  fetchRequests, 
  search
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
import connection from "../../SignalR/SignalRService";
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
      isSendPointsModalOpen,
}=useSelector((state)=>state.orders);

    const dispatch=useDispatch();

useEffect(() => {

    const startConnection = async () => {
        if (connection.state === "Disconnected") {
            try {
                await connection.start();
                console.log("SignalR Connected!");
            } catch (err) {
                console.error("SignalR Connection Error: ", err);
            }
        }
    };

    startConnection();
    connection.on("UpdateOrders", () => {
        console.log("Real-time update received!");
         setTimeout(() => {
        dispatch(fetchRequests());
        dispatch(fetchOrders());
        dispatch(fetchRejectedOrders());
    }, 500);
    });

    return () => {
        connection.off("UpdateOrders");
    };
}, [dispatch]);

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

const searchOrder=(e)=>{
    const searchValue = e.target.value;
    if (searchValue === "" ) {
         dispatch(fetchOrders()); 
        return;
    }
    const searchData={
        term:searchValue,
        fields:["UserName","RequestID","DeviceItem"]
    }
    dispatch(search(searchData));
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
        <div className="search-box-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                className="search-input"
                onChange={(e)=>searchOrder(e)}
              />
            </div>
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