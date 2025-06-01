"use client"
import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";



export default  function Loginpage(){
    const router = useRouter()
    const [number, setNumber]=useState("");
    const [password,setPassword]=useState("");
    const already:boolean=true;
    async function  onclick(){
        try {
            if (!number || !password) {
                alert("Please fill in all fields.");
                return;
            }
           
            const sessionresponse=await axios.post("/api/sessionauth", {number,password,already});
            if (sessionresponse.status===200){
                console.log("session response is")
                console.log(sessionresponse.data)
                router.push('/')
            }
            else{
                {alert("session error")}
            }
            
        } catch (error) {
            console.error("login error:", error);
            alert("An error occurred during logging in.");
        }
        
    }
     return(
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                
                
                <div>
                <TextInput placeholder={"1234567890"} label="Number" onChange={(value) => {setNumber(value)}} />
                </div>
                <div>
                <TextInput placeholder={"strong password"} label="password" onChange={(value) => {setPassword(value)}} />
                </div>
                <div className="bg-blue-300 rounded shadow p-4 m-2 hover:bg-blue-400 text-center">
                    <button onClick={onclick}>log in</button>
                </div>
                            
                
            </div>
        )
}