import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { variables } from "../components/variables";

export const fetchCartProducts=createAsyncThunk("fetchCartProducts/store",async()=>{
    const resp=await axios.get(variables.STORE_API+"GetProducts")
    .then((res)=>res.data);
    return resp;
})
export const fetchCartCategories=createAsyncThunk("fetchCartCategories/store",async()=>{
    const resp=await axios.get(variables.STORE_API+"GetCategories")
    .then((res)=>res.data);
    return resp;
})
export const fetchProductsByCat=createAsyncThunk("fetchProductsByCat/store",async(id)=>{
    const resp=await axios.post(variables.STORE_API+"FilterProductsByCat?catId="+id)
    .then((res)=>res.data);
    return resp;
})