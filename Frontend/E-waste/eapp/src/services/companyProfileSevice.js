import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { variables } from "../components/variables";

/* Branches */
export const saveBranches=createAsyncThunk("saveBranches/companyProfile",async(branch)=>{
    const resp=await axios.post(variables.COM_API+"UpsertBranches",branch)
    .then((res)=>res.data);
    return resp;
})
export const deleteBranch=createAsyncThunk("deleteBranch/companyProfile",async(id)=>{
    const resp=await axios.delete(variables.COM_API+"DeleteBranch?branchId="+id)
    .then((res)=>res.data);
    return resp;
})
export const fetchBranches=createAsyncThunk("fetchBranches/companyProfile",async()=>{
    const resp=await axios.get(variables.COM_API+"GetBranches")
    .then((res)=>res.data);
    return resp;
})
/* Contacts */
export const saveContacts=createAsyncThunk("saveContacts/companyProfile",async(contact)=>{
    const resp=await axios.post(variables.COM_API+"UpsertContacts",contact)
    .then((res)=>res.data);
    return resp;
})
export const deleteContact=createAsyncThunk("deleteContact/companyProfile",async(id)=>{
    const resp=await axios.delete(variables.COM_API+"DeleteContacts?contactId="+id)
    .then((res)=>res.data);
    return resp;
})
export const fetchContacts=createAsyncThunk("fetchContacts/companyProfile",async()=>{
    const resp=await axios.get(variables.COM_API+"GetContacts")
    .then((res)=>res.data);
    return resp;
})