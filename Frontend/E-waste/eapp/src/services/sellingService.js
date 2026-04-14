import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { variables } from "../components/variables";

export const fetchBrands=createAsyncThunk("fetchBrands/selldevice",async(id)=>{
    const resp=await axios.post(variables.SELLREQUESTS_API+"GetBrandByItem?id="+id)
    .then((res)=>res.data);
    return resp;
})
export const fetchPriceEstimation=createAsyncThunk("fetchPriceEstimation/selldevice",async(params)=>{
    const resp=await axios.post(variables.SELLREQUESTS_API+"getItemsConditionByQuality",params)
    .then((res)=>res.data);
    return resp;
})
export const saveDeviceImagePath=createAsyncThunk("saveDeviceImagePath/selldevice",async(img)=>{
    const resp=await axios.post(variables.SELLREQUESTS_API+"UploadDeviceImage",img)
    .then((res)=>res.data);
    return resp;
})
export const saveData=createAsyncThunk("saveData/selldevice",async(data)=>{
    const resp=await axios.post(variables.SELLREQUESTS_API+"SaveRequest",data)
    .then((res)=>res.data);
    return resp;
})
export const fetchRequests=createAsyncThunk("fetchRequests/selldevice",async()=>{
    const resp=await axios.get(variables.SELLREQUESTS_API+"GetRequests")
    .then((res)=>res.data);
    return resp;
}) 
export const removeRequest=createAsyncThunk("removeRequest/selldevice",async(id)=>{
    const resp=await axios.delete(variables.SELLREQUESTS_API+"DeleteRequest?id="+id)
    .then((res)=>res.data);
    return resp;
})