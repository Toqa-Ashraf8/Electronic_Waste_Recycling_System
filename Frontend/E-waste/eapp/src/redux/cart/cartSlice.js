import { createSlice } from "@reduxjs/toolkit";
import { saveProductImage } from "../../services/cartService";

const initialState={
    category:{},
    product:{},
    productsList:[],
    isProductModalOpen:false,
    productImg:"",
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCategory:(state,action)=>{
            state.category={...state.category,...action.payload};
        },
        setProduct:(state,action)=>{
          state.product={...state.product,...action.payload};
        },
        toggleProductModal:(state,action)=>{
            state.isProductModalOpen=action.payload;
        },
        addNewItem:(state,action)=>{
            state.isProductModalOpen=true;
            state.product={};
            state.productImg="";
            state.product.serial=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(saveProductImage.fulfilled,(state,action)=>{
            state.productImg=action.payload;
        })
    }
})
export const{
    setCategory,
    toggleProductModal,
    setProduct,
    addNewItem
}=cartSlice.actions;
const cartReducer=cartSlice.reducer;
export default cartReducer;