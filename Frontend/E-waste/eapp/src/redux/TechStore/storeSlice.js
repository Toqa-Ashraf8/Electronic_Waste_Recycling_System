import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchCartCategories, 
    fetchCartProducts, 
    fetchProductsByCat 
} from "../../services/storeService";

const initialState={
    cartProducts:[],
    categories:[],
    selectedCategory:"",
    selectedItems:[],
    cartCount:-1,
    items:[],
}
const storeSlice=createSlice({
    name:'store',
    initialState,
    reducers:{
        setSelectedCategory: (state, action) => {
           state.selectedCategory = action.payload;
        },
    
        addItem: (state, action) => {
            const { product, id } = action.payload;
            //itemInCart ==> object كل احد بدوس عليه يجيبه ويجمع عدده عشان يتحط مره واحده وقت الدفع
            const itemInCart = state.selectedItems.find((item) => item.ProductID === id);
                if (itemInCart) {
                    itemInCart.quantity++;
                } 
                else {
                    state.selectedItems.push({ ...product, quantity: 1 });
                }
            },
            setCartCount:(state,action)=>{
                  state.items=[...state.items,action.payload];
                  state.cartCount=state.items.length;
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
 export const {setSelectedCategory,addItem,setCartCount}=storeSlice.actions;
const storeReducer=storeSlice.reducer;
export default storeReducer;