import { configureStore } from '@reduxjs/toolkit';
import countReducer from "../reducers/countSlice";
import  transactionsReducer  from '../reducers/transactionsSlice';
import selectedpeepReducer from "@/app/reducers/selectedpeepSlice";
export const createStore=()=>{
    return configureStore({
        reducer: {
            count: countReducer,
            transactions:transactionsReducer,
            selectedpeep:selectedpeepReducer,
        }
    });
}


export type AppStore=ReturnType<typeof createStore>;
export type RootState=ReturnType<AppStore['getState']>;
export type AppDispatch= AppStore['dispatch'];