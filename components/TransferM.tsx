"use client"

import { p2ptransfer } from "@/app/lib/actions/p2ptransfer";
import { Card } from "./Card";
import { TextInput } from "./TextInput";
import { useState } from "react";
import { Button } from "./Button";
import { useDispatch } from "react-redux";


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
            dispatch({ type: 'count/increment' })

            alert("money sent successfully")
        }else{
            alert("error in sending money")
        }
    }

    return(
        <Card title="send money">
            <TextInput label="to" placeholder="1234567890" onChange={(value) => {setTo(value)}} />
            <TextInput label="amount" placeholder="100" onChange={(value) => {setAmount(value)}} />
            <Button onclick={transfer}>transfer</Button>
            <button onClick={() => dispatch({ type: 'count/decrement' })}>Decrement</button>
        </Card>
    )
} 


