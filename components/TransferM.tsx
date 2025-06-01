"use client"

import { p2ptransfer } from "@/app/lib/actions/p2ptransfer";
import { Card } from "./Card";
import { TextInput } from "./TextInput";
import { useState } from "react";
import { Button } from "./Button";
import { useDispatch } from "react-redux";

import { addTransaction } from "@/app/reducers/transactionsSlice";


export default function TransferM(){
    const [to,setTo]=useState("");
    const [amount,setAmount]=useState("");
    const dispatch = useDispatch();
    

    async function transfer(){
        console.log("send money function is called")
        console.log("to is "+to)
        console.log("amount is "+amount)
        if(!to || !amount){
            alert("please fill all fields")
            return
        }
        const response=await p2ptransfer(to,Number(amount));
        if(response){
            //uddate count here
            alert("money sent successfully")
            dispatch({ type: 'count/increment' })
            
            try {
                dispatch(addTransaction({
                  amount: Number(amount),
                  timestamp: new Date().toISOString(),
                  fromUser: { number: "you" },
                  toUser: { number: to },
                }))
                
            } catch (e) {
                alert("error in updating history")
            }
        }else{
            alert("error in sending money")
        }
    }

    return(
        <div className="bg-blue-50 shadow-lg rounded-lg p-6 w-full max-w-md flex flex-col item-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Money</h2>
            <TextInput label="to" placeholder="1234567890" onChange={(value) => {setTo(value)}} />
            <TextInput label="amount" placeholder="100" onChange={(value) => {setAmount(value)}} />
            <Button onclick={transfer}>transfer</Button>
            <button onClick={() => dispatch({ type: 'count/decrement' })}>Decrement</button>
        </div>
    )
} 


