import { configureStore } from '@reduxjs/toolkit';
import countReducer from "../reducers/countSlice";
import  transactionsReducer  from '../reducers/transactionsSlice';

export const createStore=()=>{
    return configureStore({
        reducer: {
            count: countReducer,
            transactions:transactionsReducer

        }
    });
}


export type AppStore=ReturnType<typeof createStore>;
export type RootState=ReturnType<AppStore['getState']>;
export type AppDispatch= AppStore['dispatch'];