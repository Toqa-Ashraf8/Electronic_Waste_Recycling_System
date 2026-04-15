import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { variables } from "../components/variables";

export const saveProductImage=createAsyncThunk("saveProductImage/cart",async(img)=>{
    const resp=await axios.post(variables.CART_API+"UploadProductImage",img)
    .then((res)=>res.data);
    return resp;
})
export const saveProducts=createAsyncThunk("saveProduct/cart",async(params)=>{
    const resp=await axios.post(variables.CART_API+"UpsertProducts",params)
    .then((res)=>res.data);
    return resp;
})
export const fetchCartCategories=createAsyncThunk("fetchCartCategories/cart",async()=>{
    const resp=await axios.get(variables.CART_API+"GetCategories")
    .then((res)=>res.data);
    return resp;
})
export const fetchProducts=createAsyncThunk("fetchProducts/cart",async(id)=>{
    const resp=await axios.post(variables.CART_API+"GetProductsByCat?catId="+id)
    .then((res)=>res.data);
    return resp;
})
export const deleteAll=createAsyncThunk("deleteAll/cart",async(id)=>{
    const resp=await axios.delete(variables.CART_API+"DeleteCatWithProducts?catId="+id)
    .then((res)=>res.data);
    return resp;
})