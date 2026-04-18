import React, { useEffect, useRef } from "react";
import { Save, BrushCleaning, Search, Trash } from 'lucide-react';
import './AddBranches.css';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { 
    resetBranchForm, 
    setBranchValues, 
    toggleDeleteBranchModal, 
    toggleSearchBranchModal
 } from "../../redux/companyProfile/companyProfileSlice";
import { deleteBranch, saveBranches } from "../../services/companyProfileSevice";
import BranchSearchModal from "./modals/BranchSearchModal";
import DeleteBranchModal from "./modals/DeleteBranchModal";


function AddBranches() {
    const {
        branch,
        isSearchBranchOpen,
        isDeleteBranchOpen
    }=useSelector((state)=>state.companyProfile);
    const dispatch = useDispatch();
    const branchNameRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
         dispatch(setBranchValues({ [name]: value }));
    };

    const clearForm = () => {
        dispatch(resetBranchForm());
        if(branchNameRef.current) branchNameRef.current.focus();
    };

    const saveBranch = async () => {
        try {
            const result=await dispatch(saveBranches(branch)).unwrap();
            if(result.saved){
                toast.success("Data Saved Succesfully!",{
                    theme:'colored',
                    position:'top-right'
                })
            }
            else if(result.updated){
                toast.success("Data Updated Succesfully!",{
                    theme:'colored',
                    position:'top-right'
                })
            }
        } catch (error) {}
    };


    useEffect(() => {
        if(branchNameRef.current) branchNameRef.current.focus();
    }, []);

    return (
        <div className="branch-mgmt-container">
            {isSearchBranchOpen && <BranchSearchModal/>}
            {isDeleteBranchOpen && <DeleteBranchModal/>}
            <h5 className="branch-main-title">BRANCH MANAGEMENT</h5>
            <div className="branch-card-wrapper animate__animated animate__fadeIn">
                <div className="branch-actions-sidebar">
                    <button 
                    className="branch-btn-tool" 
                    onClick={()=>clearForm()} 
                    title="Clear Form">
                        <BrushCleaning size={22} color="black" />
                    </button>
                    <button 
                    className="branch-btn-tool" 
                    onClick={()=>saveBranch()} 
                    title="Save Branch">
                        <Save size={22} color="green" />
                    </button>
                    <button 
                    className="branch-btn-tool" 
                    onClick={() => dispatch(toggleDeleteBranchModal(true))} 
                    title="Delete">
                        <Trash size={22} color="red" />
                    </button>
                    <button 
                    className="branch-btn-tool" 
                    onClick={() => dispatch(toggleSearchBranchModal(true))} 
                    title="Search">
                        <Search size={22} color="blue" />
                    </button>
                </div>

                <div className="branch-master-section">
                    <div className="branch-stack-column">
                        
                        <div className="branch-input-group">
                            <label className="branch-label">Branch ID</label>
                            <input 
                                type="text" 
                                className="form-control branch-input-field"
                                name="BranchID"
                                value={branch.BranchID || 0}
                                disabled 
                            />
                        </div>

                        <div className="branch-input-group">
                            <label className="branch-label">Branch Name</label>
                            <input 
                                type="text" 
                                className="form-control branch-input-field"
                                name="BranchName"
                                autoComplete="off"
                                ref={branchNameRef}
                                value={branch.BranchName || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="branch-input-group">
                            <label className="branch-label">Location / City</label>
                            <input 
                                type="text" 
                                className="form-control branch-input-field"
                                name="Location"
                                value={branch.Location || ""}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="branch-input-group">
                            <label className="branch-label">Phone Number</label>
                            <input 
                                type="text" 
                                className="form-control branch-input-field"
                                name="BranchPhone"
                                value={branch.BranchPhone || ""}
                                onChange={handleChange}
                            />
                        </div>
                          <div className="branch-input-group">
                            <label className="branch-label">Working Hours</label>
                            <input 
                                type="text" 
                                className="form-control branch-input-field"
                                name="WorkingHours"
                                value={branch.WorkingHours || ""}
                                onChange={handleChange}
                            />
                        </div>
                          <div className="branch-input-group">
                            <label className="branch-label">Map Link</label>
                            <input 
                                type="text" 
                                className="form-control branch-input-field"
                                name="MapLink"
                                value={branch.MapLink || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBranches;