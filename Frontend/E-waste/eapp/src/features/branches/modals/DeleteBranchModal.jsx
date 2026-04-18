import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import './DeleteBranchModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toggleDeleteBranchModal } from '../../../redux/companyProfile/companyProfileSlice';
import { deleteBranch } from '../../../services/companyProfileSevice';


const DeleteBranchModal = () => {
    const { branch } = useSelector((state) => state.companyProfile);
    const dispatch = useDispatch();

    const confirmDelete = async () => {
        try {
          const result=await dispatch(deleteBranch(branch.BranchID)).unwrap();
          if(result.deleted){
            toast.error("Branch has been deleted !",{
            theme:'colored',
            position:'top-right'
           })
          }  
        } 
        catch (error) { dispatch(toggleDeleteBranchModal(false))};
    }
    return (
        <div className="brn-delete-overlay">
            <div className="brn-delete-card">
                <div className="brn-delete-body">
                    <FiAlertTriangle className="brn-warn-icon" />
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to delete this Branch?</p>
                </div>
                <div className="brn-delete-footer">
                    <button className="brn-btn-no" 
                    onClick={() => dispatch(toggleDeleteBranchModal(false))}>No</button>
                    <button className="brn-btn-yes" onClick={()=>confirmDelete()}>
                        Yes, Delete
                     </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBranchModal;