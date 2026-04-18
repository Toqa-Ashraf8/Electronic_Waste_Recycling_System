import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './BranchSearchModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fillBranchForm, 
    toggleSearchBranchModal 
} from '../../../redux/companyProfile/companyProfileSlice';
import { fetchBranches } from '../../../services/companyProfileSevice';

const BranchSearchModal = () => {
     const { branches } = useSelector((state) => state.companyProfile);
     const dispatch = useDispatch();
     
     useEffect(()=>{
        dispatch(fetchBranches());
     },[])

    return (
        <div className="brn-search-overlay">
            <div className="brn-search-card wide-modal">
                <div className="brn-search-header">
                    <span>Branches List & Details</span>
                    <button className="brn-close-x" 
                    onClick={() => dispatch(toggleSearchBranchModal(false))}>
                        <FiX />
                    </button>
                </div>
                <div className="brn-search-body">
                    <table className="brn-mini-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Branch Name</th>
                                <th>Location</th>
                                <th>Phone Number</th>
                                <th>Business Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.length > 0 ? (
                                branches.map((brn, index) => (
                                    <tr key={index} onClick={() => dispatch(fillBranchForm(index))}>
                                        <td className="brn-id-txt">{brn.BranchID}</td>
                                        <td className="brn-bold-text">{brn.BranchName}</td>
                                        <td>{brn.Location}</td>
                                        <td>{brn.BranchPhone}</td>
                                        <td className="hours-txt">{brn.WorkingHours}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="brn-empty">No branches found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BranchSearchModal;