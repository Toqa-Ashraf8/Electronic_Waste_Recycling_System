import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { variables } from "../components/variables";

export const saveProductImage=createAsyncThunk("saveProductImage/cart",async(img)=>{
    const resp=await axios.post(variables.CART_API+"UploadProductImage",img)
    .then((res)=>res.data);
    return resp;
})