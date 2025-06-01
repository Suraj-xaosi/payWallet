"use client"

import {ReactNode} from "react";

interface ButtonProps{
    children :ReactNode;
    onclick:()=>void;
}

export const Button=({onclick,children}:ButtonProps)=>{
    return(
        <button onClick={onclick} type="button" className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5">
            {children}
        </button>
    )
}