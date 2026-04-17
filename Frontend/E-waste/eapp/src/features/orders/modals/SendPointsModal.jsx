import React from 'react';
import './SendPointsModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSendPointsModal } from '../../../redux/orders/ordersSlice';
import { fetchOrders, sendPoints } from '../../../services/ordersService';
import { toast } from 'react-toastify';
import { fetchUserOrders } from '../../../services/authService';

const SendPointsModal = () => {
   const dispatch=useDispatch();
    const {orderDetail}=useSelector((state)=>state.orders);
    const {userDetails}=useSelector((state)=>state.auth);
    const confirmSendingPoints=async()=>{
    try {
        const result=await dispatch(sendPoints(orderDetail)).unwrap();
        if(result.done){
        toast.success(`Points sent ! Order ${orderDetail.OrderID} is now completed`,{
                theme:'colored',
                position:'top-right',
        })
         dispatch(fetchOrders());
        } 
        dispatch(fetchUserOrders(userDetails.UserID))
    } catch (error) {
        dispatch(toggleSendPointsModal(false))
    }
    }
    return (
        <div className="top-modal-overlay" >
            <div className="send-points-card" onClick={e => e.stopPropagation()}>
                <div className="send-points-header">
                    <div className="coin-icon">💰</div>
                    <h4>Send Reward Points?</h4>
                </div>
                
                <div className="send-points-body">
                    <p>
                        Confirming this will send the points to the customer 
                        <strong> </strong> 
                        and mark it as <strong>Completed</strong>.
                    </p>
                </div>

                <div className="send-points-actions">
                    <button 
                    className="btn btn-danger"
                     onClick={()=>dispatch(toggleSendPointsModal(false))}
                     >Not Now</button>
                    <button 
                    className="btn-yes-send"
                    onClick={()=>confirmSendingPoints()} 
                    >Yes, Send Points</button>
                </div>
            </div>
        </div>
    );
};

export default SendPointsModal;