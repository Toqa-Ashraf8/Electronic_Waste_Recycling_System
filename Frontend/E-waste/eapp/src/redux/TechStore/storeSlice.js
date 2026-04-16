import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchCartCategories, 
    fetchCartProducts, 
    fetchProductsByCat 
} from "../../services/storeService";

const initialState={
    cartProducts:[],
    categories:[],
     selectedCategory:"" 
}
const storeSlice=createSlice({
    name:'store',
    initialState,
    reducers:{
        setSelectedCategory: (state, action) => {
           state.selectedCategory = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder 
        .addCase(fetchCartProducts.fulfilled,(state,action)=>{
            state.cartProducts=action.payload;
        }) 
        .addCase(fetchCartCategories.fulfilled,(state,action)=>{
            state.categories=action.payload;
         
        })
        .addCase(fetchProductsByCat.fulfilled,(state,action)=>{
            state.cartProducts=action.payload;
         
        })
    }
})
export const {setSelectedCategory}=storeSlice.actions;
const storeReducer=storeSlice.reducer;
export default storeReducer;