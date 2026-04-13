import React from 'react';
import './OrderDetailsModal.css';
import { FaCheck, FaTimes, FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOrdersImgModal } from '../../../redux/orders/ordersSlice';
import { variables } from '../../../components/variables';

const OrderDetailsModal = () => {
   const {requestDeviceImg}=useSelector((state)=>state.orders);
   const dispatch=useDispatch();

    return (
        <div className="modalI">
            <div className="modalcnt details-mdl">
                <div className="headerm">
                <span 
                className='btn_close_m' 
                onClick={()=>dispatch(toggleOrdersImgModal(false))}
                >
                 &times;
                </span>
                </div>
                <div className="bodyI">
                    <div className="mdl-flex-container">
                     <div className="mdl-image-section">
                        {requestDeviceImg ? 
                        (<div className="image-frame">                
                        <img src={variables.DEVICEIMG_API+requestDeviceImg} alt="" />                       
                         </div>) :
                        (<div className="no-img">
                          <span>No Image Provided</span>
                         </div>)
                        } 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsModal;