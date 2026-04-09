import { createSlice } from "@reduxjs/toolkit";

const initialState={
    request:{}
}
const sellingSlice=createSlice({
    name:'selldevice',
    initialState,
    reducers:{
        setRequestValues:(state,action)=>{
            state.request={...state.request,...action.payload};
        }
    }
})
export const {setRequestValues}=sellingSlice.actions;
const sellReducer=sellingSlice.reducer;
export default sellReducer;