import { createSlice } from "@reduxjs/toolkit";

const initialState={
    category:{},
    items:[],
}
const categorySlice=createSlice({
    name:'category',
    initialState,
    reducers:{
        setCategoryValues:(state,action)=>{
            state.category={...state.category,...action.payload};
        }
    }
})
export const {setCategoryValues}=categorySlice.actions;
const catReducer=categorySlice.reducer;
export default catReducer;