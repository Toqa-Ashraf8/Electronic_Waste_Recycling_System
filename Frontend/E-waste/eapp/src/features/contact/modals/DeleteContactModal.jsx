import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './DeleteContactModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../../services/companyProfileSevice';
import { toggleDeleteContactModal } from '../../../redux/companyProfile/companyProfileSlice';
import { toast } from 'react-toastify';

const DeleteContactModal = () => {
    const { contact } = useSelector((state) => state.companyProfile);
    const dispatch = useDispatch();

    const confirmDelete = async () => {
        try {
         const result=await dispatch(deleteContact(contact.ContactID)).unwrap();
        if(result.deleted){
         toast.error("Contact has been deleted !",{
              theme:'colored',
              position:'top-right'
        })
        }  
        } 
        catch (error) { dispatch(toggleDeleteContactModal(false))};
    }

    return (
        <div className="cnt-delete-overlay">
            <div className="cnt-delete-card">
                <div className="cnt-delete-body">
                    <FiAlertTriangle className="cnt-warn-icon" />
                    <h3>Delete Contact</h3>
                   <p>Are you sure you want to delete this Contact?</p>
                </div>
                <div className="cnt-delete-footer">
                    <button className="cnt-btn-cancel" 
                    onClick={() => dispatch(toggleDeleteContactModal(false))}>Cancel</button>
                    <button className="cnt-btn-delete"
                     onClick={()=>confirmDelete()}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteContactModal;