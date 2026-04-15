import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';; 
import './DeleteRequestModal.css';
import { removeRequest } from '../../../services/sellingService';
import { toggleDeleteReqModal } from '../../../redux/selldevice/sellingSlice';
const DeleteRequestModal = () => {
    const {requestRowId}=useSelector((state)=>state.selldevice);
    const dispatch = useDispatch();
    const handleConfirmDelete = async () => {
        try {
            const result = await dispatch(removeRequest(requestRowId)).unwrap();    
            if (result.deleted) { 
                toast.error("Request deleted successfully!", {
                    theme: 'colored',
                    position: 'top-right',
                    autoClose: 2000,
                });  
                dispatch(toggleDeleteReqModal(false));
            }
        } catch (error) {
            dispatch(toggleDeleteReqModal(false));
        }
    };
    return (
        <div className="request-delete-overlay">
            <div className="request-delete-card">
                <div className="request-delete-body">
                    <FiAlertTriangle className="request-warning-icon" />
                    <h3>Confirm Action</h3>
                    <p>
                        Are you sure you want to delete this Request? 
                    </p>
                </div>
                <div className="request-delete-footer">
                    <button 
                        className="request-btn-cancel" 
                        onClick={() => dispatch(toggleDeleteReqModal(false))}
                    >
                        No
                    </button>
                    <button 
                        className="request-btn-confirm"
                        onClick={()=>handleConfirmDelete()}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteRequestModal;