import {createSlice} from "@reduxjs/toolkit"
import { number } from "framer-motion"

interface position{
    x:number;
    y:number;   
}

interface peep{
    id:number ;
    name:string ;
    number:string;
    position?:position;
}

const initialState:peep[]=[{id:-1,name:"zzzz",number:"0000000000",position:{x:500,y:100}}];

export const selectedpeepSlice=createSlice({
    name:"selectedpeep",
    initialState,
     
    reducers:{
        adduser:(state,action)=>{
            state.push(action.payload)
        },
        removeuser: (state, action) => {
            const index = state.findIndex((u) => u.id === action.payload.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        updateposition:(state,action)=>{
            const {id, x, y} = action.payload;
            const user = state.find((u) => u.id === id);
            if (user) {
                user.position = { x, y };
            }
        }
    }
});
export const {adduser,removeuser,updateposition}=selectedpeepSlice.actions;
export default selectedpeepSlice.reducer;