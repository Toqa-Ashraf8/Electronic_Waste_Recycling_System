import React from 'react';
import './ConfirmRecievingModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleConfirmRecieveModal } from '../../../redux/orders/ordersSlice';
import { fetchOrders, recieveOK } from '../../../services/ordersService';
import { toast } from 'react-toastify';

const ConfirmRecievingModal = () => {
const {selectedCourier}=useSelector((state)=>state.orders);
const dispatch=useDispatch();

const handleRecieve=async(orderId,reqId)=>{
    const params={OrderID:orderId,RequestID:reqId}
      try {
       const result= await dispatch(recieveOK(params)).unwrap();
       if(result.done){
        toast.success("Order Recieved!",{
            theme:'colored',
            position:'top-right'
        })
        dispatch(fetchOrders());
       }
    } catch (error) {
        dispatch(toggleConfirmRecieveModal(false))
    }
}
    return (
        <div className="mini-modal-overlay" >
        {selectedCourier && selectedCourier.map(c=>
            <div className="mini-modal-card" onClick={e => e.stopPropagation()}>
                <div className="mini-modal-body">
                      <h4>Confirm Receipt</h4>
                      <div className="confirm-text-container">
                        <p className="confirm-text">
                            Are you sure you have received request
                            <span className="highlight-id"> # {c.RequestID} </span>
                            from courier
                           <strong style={{marginLeft:'10px'}}>{c.CourierName}</strong>?
                        </p>
                        </div>
                   </div>
                <div className="mini-modal-actions">
                    <button 
                    className="btn-confirm-final" 
                    onClick={()=>(handleRecieve(c.OrderID,c.RequestID))}
                    >
                        Yes, Received
                    </button>
                    <button 
                    className="btn btn-danger"
                    onClick={()=>dispatch(toggleConfirmRecieveModal(false))}
                    >
                      No
                    </button>
                </div>
            </div>
             )}
        </div>
    );
};

export default ConfirmRecievingModal;