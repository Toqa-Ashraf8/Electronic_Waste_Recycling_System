import { createSlice } from "@reduxjs/toolkit";

const initialState={
    category:{},
    item:{},
    itemsList:[],
    isCategoryModalOpen:false,
}
const categorySlice=createSlice({
    name:'category',
    initialState,
    reducers:{
        setCategoryValues:(state,action)=>{
            state.category={...state.category,...action.payload};
        },
        toggleCategoryModal:(state,action)=>{
            state.isCategoryModalOpen=action.payload;
        },
        resetCategoryForm:(state,action)=>{
            state.category=initialState.category;
            state.itemsList=[];
        },
        setItemValues:(state,action)=>{
            state.item={...state.item,...action.payload};
        },
        addNewItem:(state,action)=>{
            state.item={} 
            state.item.serial=action.payload;
        }
    }
})
export const {
    setCategoryValues,
    toggleCategoryModal,
    resetCategoryForm,
    setItemValues,
    addNewItem
}=categorySlice.actions;
const catReducer=categorySlice.reducer;
export default catReducer;