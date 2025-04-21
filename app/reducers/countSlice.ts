import { createSlice } from "@reduxjs/toolkit";
const initialState:number=0;
export const countSlice=createSlice({
    name:"count", 
    initialState,

    reducers:{
        increment:(state,action)=>{
            return state+1;
        },
        decrement:(state,action)=>{
            return state-1;
        },
    }
});



export const {increment,decrement}=countSlice.actions;
export default countSlice.reducer;