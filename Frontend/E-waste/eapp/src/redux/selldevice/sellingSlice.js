import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchPriceEstimation } from "../../services/sellingService";

const initialState={
    request:{},
    brands:[],
    priceEstimation:{},
    
}
const sellingSlice=createSlice({
    name:'selldevice',
    initialState,
    reducers:{
        setRequestValues:(state,action)=>{
            state.request={...state.request,...action.payload};
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBrands.fulfilled,(state,action)=>{
            state.brands=action.payload;
        })
        .addCase(fetchPriceEstimation.fulfilled, (state, action) => {
            if (action.payload && action.payload.conditions && action.payload.conditions.length > 0) {
                state.priceEstimation = action.payload.conditions[0];
            } else {
                state.priceEstimation = {}; 
            }
        })
       
    }
})
export const {setRequestValues}=sellingSlice.actions;
const sellReducer=sellingSlice.reducer;
export default sellReducer;