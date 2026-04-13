import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { variables } from "../components/variables";

export const fetchRequests=createAsyncThunk("fetchRequests/orders",async()=>{
    const resp=await axios.get(variables.ORDERS_API+"GetOrderRequests")
    .then((res)=>res.data);
    return resp;
})