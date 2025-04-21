import { configureStore } from '@reduxjs/toolkit';
import countReducer from "../reducers/countSlice";

export const createStore=()=>{
    return configureStore({
        reducer: {
            count: countReducer
        }
    });
}


export type AppStore=ReturnType<typeof createStore>;
export type RootState=ReturnType<AppStore['getState']>;
export type AppDispatch= AppStore['dispatch'];