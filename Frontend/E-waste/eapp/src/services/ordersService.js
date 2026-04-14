import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { variables } from "../components/variables";

export const fetchRequests=createAsyncThunk("fetchRequests/orders",async()=>{
    const resp=await axios.get(variables.ORDERS_API+"GetOrderRequests")
    .then((res)=>res.data);
    return resp;
})
export const saveOrders=createAsyncThunk("saveOrders/orders",async(order)=>{
    const resp=await axios.post(variables.ORDERS_API+"SaveOrders",order)
    .then((res)=>res.data);
    return resp;
})
export const fetchOrders=createAsyncThunk("fetchOrders/orders",async()=>{
    const resp=await axios.get(variables.ORDERS_API+"GetOrders")
    .then((res)=>res.data);
    return resp;
})
export const fetchRejectedOrders=createAsyncThunk("fetchRejectedOrders/orders",async()=>{
    const resp=await axios.get(variables.ORDERS_API+"GetRejectedOrders")
    .then((res)=>res.data);
    return resp;
})
export const saveDispatch=createAsyncThunk("saveDispatch/orders",async(params)=>{
    const resp=await axios.post(variables.ORDERS_API+"SaveDispatchInformation",params)
    .then((res)=>res.data);
    return resp;
})
export const getRequestWithDispatches=createAsyncThunk("getRequestWithDispatches/orders",async(reqId)=>{
    const resp=await axios.post(variables.ORDERS_API+"GetDispatchInformation?requestId="+reqId)
    .then((res)=>res.data);
    return resp;
})
export const recieveOK=createAsyncThunk("recieveOK/orders",async(params)=>{
    const resp=await axios.post(variables.ORDERS_API+"RecieveOrder",params)
    .then((res)=>res.data);
    return resp;
})
export const sendPoints=createAsyncThunk("sendPoints/orders",async(params)=>{
    const resp=await axios.post(variables.ORDERS_API+"SendPoints",params)
    .then((res)=>res.data);
    return resp;
})