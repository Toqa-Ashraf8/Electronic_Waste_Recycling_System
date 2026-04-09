import { createSlice } from "@reduxjs/toolkit";
import { saveAllData } from "../../services/categoryService";

const initialState={
    category:{CategoryID:0,CategoryName:""},
    item:{},
    itemsList:[],
    isCategoryModalOpen:false,
    rowIndex:-1,
    isDeleteItemModalOpen:false,
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
            state.rowIndex=-1;
            state.item={} 
            state.item.serial=action.payload;
        },
        //Edit Item (1) or Add New Item (-1)
        setFormMode:(state,action)=>{
            if(state.rowIndex===-1){
               state.itemsList = [...state.itemsList, state.item];
            }
            else{
               state.itemsList[state.rowIndex]=state.item;
            } 
            state.isCategoryModalOpen=false;
        },
        setEditItem:(state,action)=>{
            state.isCategoryModalOpen=true;
            state.rowIndex=action.payload;
            if(action.payload!==-1){
                    state.item=state.itemsList[state.rowIndex];
            }
        },
        toggleDeleteItemModal:(state,action)=>{
            state.isDeleteItemModalOpen=action.payload;
        },
        setItemIndex:(state,action)=>{
            state.rowIndex=action.payload;
            state.isDeleteItemModalOpen=true;
        },
        deleteItem:(state,action)=>{
            state.itemsList=state.itemsList.filter((item,index)=>index!==state.rowIndex);
            state.isDeleteItemModalOpen=false;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(saveAllData.fulfilled,(state,action)=>{
            state.category.CategoryID=action.payload.id;
        })
    }
})
export const {
    setCategoryValues,
    toggleCategoryModal,
    resetCategoryForm,
    setItemValues,
    addNewItem,
    setFormMode,
    setEditItem,
    toggleDeleteItemModal,
    setItemIndex,
    deleteItem
}=categorySlice.actions;
const catReducer=categorySlice.reducer;
export default catReducer;