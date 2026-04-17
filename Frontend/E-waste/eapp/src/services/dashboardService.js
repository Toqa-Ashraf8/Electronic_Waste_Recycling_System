import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { variables } from "../components/variables";

export const fetchStatistics=createAsyncThunk("fetchStatistics/dashboard",async()=>{
    const resp=await axios.get(variables.DASH_API+"GetRequestStats")
    .then((res)=>res.data);
    return resp;
})
export const fetchUsersCount=createAsyncThunk("fetchUsersCount/dashboard",async()=>{
    const resp=await axios.get(variables.DASH_API+"GetUsersCount")
    .then((res)=>res.data);
    return resp;
})
export const fetchPendingOrders=createAsyncThunk("fetchPendingOrders/dashboard",async()=>{
    const resp=await axios.get(variables.DASH_API+"PendingOrdersCount")
    .then((res)=>res.data);
    return resp;
})
export const fetchTotalPoints=createAsyncThunk("fetchTotalPoints/dashboard",async()=>{
    const resp=await axios.get(variables.DASH_API+"GetTotalPoints")
    .then((res)=>res.data);
    return resp;
})
export const fetchTotalOrdersCount=createAsyncThunk("fetchTotalOrdersCount/dashboard",async()=>{
    const resp=await axios.get(variables.DASH_API+"AllOrdersCount")
    .then((res)=>res.data);
    return resp;
})
export const fetchCategoriesStats=createAsyncThunk("fetchCategoriesStats/dashboard",async()=>{
    const resp=await axios.get(variables.DASH_API+"GetCategoryStats")
    .then((res)=>res.data);
    return resp;
})