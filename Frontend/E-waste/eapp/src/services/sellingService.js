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