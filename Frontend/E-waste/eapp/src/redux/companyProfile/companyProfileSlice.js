import { createSlice } from "@reduxjs/toolkit";
import { deleteBranch, deleteContact, fetchBranches, fetchContacts, saveBranches, saveContacts } from "../../services/companyProfileSevice";

const initialState={
    branch:{
        BranchID:0,
        BranchName:"",
        Location:"",
        BranchPhone:"",
        WorkingHours:"",
        MapLink:""
    },
    contact:{
        ContactID:0,
        PhoneSupport:"",
        StartHour:"",
        EndHour:"",
        Email:"",
        WhatsAppNumber:""
    },
    branches:[],
    contacts:[],
    rowIndex:-1,
    isSearchBranchOpen:false,
    isDeleteBranchOpen:false,
    isSearchContactOpen:false,
    isDeleteContactOpen:false
}
const companyProfileSlice=createSlice({
    name:'companyProfile',
    initialState,
    reducers:{

        //branches
        setBranchValues:(state,action)=>{
            state.branch={...state.branch,...action.payload};
        },
        resetBranchForm:(state,action)=>{
            state.branch=initialState.branch;
        },
        toggleSearchBranchModal:(state,action)=>{
            state.isSearchBranchOpen=action.payload;
        },
        toggleDeleteBranchModal:(state,action)=>{
            state.isDeleteBranchOpen=action.payload;
        },
        fillBranchForm:(state,action)=>{
            state.branch=state.branches[action.payload];
            state.isSearchBranchOpen=false;
        },

        //conatcts
        setContactValues:(state,action)=>{
            state.contact={...state.contact,...action.payload};
        },
        resetContactForm:(state,action)=>{
            state.contact=initialState.contact;
        },
        toggleSearchContactModal:(state,action)=>{
            state.isSearchContactOpen=action.payload;
        },
        toggleDeleteContactModal:(state,action)=>{
            state.isDeleteContactOpen=action.payload;
        },
        fillContactForm:(state,action)=>{
            state.contact=state.contacts[action.payload];
            state.isSearchContactOpen=false;
        }

    },
    extraReducers:(builder)=>{
        builder
        //branches
        .addCase(saveBranches.fulfilled,(state,action)=>{
            state.branch.BranchID=action.payload.id;
        })
        .addCase(deleteBranch.fulfilled,(state,action)=>{
            state.branch=initialState.branch;
            state.isDeleteBranchOpen=false;
        })
        .addCase(fetchBranches.fulfilled,(state,action)=>{
            state.branches=action.payload;
        })
        //contacts
         .addCase(saveContacts.fulfilled,(state,action)=>{
            state.contact.ContactID=action.payload.id;
        })
        .addCase(deleteContact.fulfilled,(state,action)=>{
            state.contact=initialState.contact;
            state.isDeleteContactOpen=false;
        })
        .addCase(fetchContacts.fulfilled,(state,action)=>{
            state.contacts=action.payload;
        })
    }
})
export const {
    setBranchValues,
    resetBranchForm,
    toggleSearchBranchModal,
    toggleDeleteBranchModal,
    fillBranchForm,
    setContactValues,
    resetContactForm,
    toggleSearchContactModal,
    toggleDeleteContactModal,
    fillContactForm
}=companyProfileSlice.actions;
const companyReducer=companyProfileSlice.reducer;
export default companyReducer;