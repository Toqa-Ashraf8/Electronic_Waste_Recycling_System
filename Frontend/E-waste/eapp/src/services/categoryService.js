import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { variables } from "../components/variables";

export const saveAllData=createAsyncThunk("saveAllData/category",async(parms)=>{
    const resp=await axios.post(variables.CATEGORY_API+"UpsertCategory",parms)
    .then((res)=>res.data);
    return resp;
})
export const fetchCategories=createAsyncThunk("fetchCategories/category",async()=>{
    const resp=await axios.get(variables.CATEGORY_API+"GetAllCategories")
    .then((res)=>res.data);
    return resp;
})
export const fetchItems=createAsyncThunk("fetchItems/category",async(id)=>{
    const resp=await axios.post(variables.CATEGORY_API+"GetItemsByCategory?id="+id)
    .then((res)=>res.data);
    return resp;
})
export const deleteCategory=createAsyncThunk("deleteCategory/category",async(deletedid)=>{
    const resp=await axios.delete(variables.CATEGORY_API+"DeleteCategory?id="+deletedid)
    .then((res)=>res.data);
    return resp;
})