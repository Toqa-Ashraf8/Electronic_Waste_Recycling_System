import { createSlice } from "@reduxjs/toolkit";
import { deleteCategory, fetchCategories, fetchItems, saveAllData } from "../../services/categoryService";

const initialState={
    category:{CategoryID:0,CategoryName:""},
    categories:[],
    item:{},
    itemsList:[],
    isCategoryModalOpen:false,
    rowIndex:-1,
    isDeleteItemModalOpen:false,
    isSearchCatModalOpen:false,
    deletedSuccessfully:false,
    isDeleteCatModalOpen:false,
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
        //Edit Item (rowIndex=> index) or Add New Item (rowIndex=-1)
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
        },
        toggleSearchModal:(state,action)=>{
            state.isSearchCatModalOpen=action.payload;
        },
        fillCategoryForm:(state,action)=>{
            state.category=state.categories[action.payload];
            state.isSearchCatModalOpen=false;
        },
        toggleDeleteCatModal:(state,action)=>{
            state.isDeleteCatModalOpen=action.payload;
        },
        setQualityAutomatically:(state,action)=>{
            if(action.payload==='Scrap/Bad'){
                state.item.Quality='20%';
            }
            else if(action.payload==='Fair'){
                state.item.Quality='50%';
            }
            else if(action.payload==='Good'){
                state.item.Quality='80%';
            }
            else if(action.payload==='Excellent'){
                state.item.Quality='100%';
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(saveAllData.fulfilled,(state,action)=>{
            state.category.CategoryID=action.payload.id;
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.categories=action.payload;
        }) 
        .addCase(fetchItems.fulfilled,(state,action)=>{
            state.itemsList=action.payload;
        }) 
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.deletedSuccessfully=action.payload;
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
    deleteItem,
    toggleSearchModal,
    fillCategoryForm,
    toggleDeleteCatModal,
    setQualityAutomatically
}=categorySlice.actions;
const catReducer=categorySlice.reducer;
export default catReducer;