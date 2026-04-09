import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { variables } from "../components/variables";

export const saveAllData=createAsyncThunk("saveAllData/category",async(parms)=>{
    const resp=await axios.post(variables.CATEGORY_API+"UpsertCategory",parms)
    .then((res)=>res.data);
    return resp;
})