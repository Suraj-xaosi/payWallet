"use client"
import { Card } from "@/components/Card";

import { TextInput } from "@/components/TextInput";
//import { prisma } from "@/prismaclient";
import axios from "axios";
import  { useRouter } from "next/navigation";
//import { NextResponse } from "next/server";
import { useState } from "react";



export default function Signuppage(){
    const router = useRouter()
    const [username,setUsername]=useState("");
    const [number, setNumber]=useState("");
    const [password,setPassword]=useState("");
    const already:boolean=false;
    
    async function onclick(){
        try {
            if (!username || !number || !password) {
                alert("Please fill in all fields.");
                return;
            }
            //console.log("signup api calling");
            //const response = await axios.post("/api/signup", { username, number, password });
            //console.log("signup api responsed");
            //console.log(response.data);
            //const {balance } = response.data.user;
            //const chbalance:string=String(balance);
            //alert(balance);
            
            //if (response.status === 201) {
                //alert("User created successfully!");
                //try{
                    const sessionresponse=await axios.post("/api/sessionauth", {password,number,username,already});
                    if (sessionresponse.status===200){
                        console.log("session response is")
                        console.log(sessionresponse.data)
                        router.push('/')
                    }
                    else{
                        {alert("session error")}
                    }
                //}catch(e){
                    //console.log(e);
                 //   router.push("/login");
                //}
                
            //} else {
              //  alert(response.data.message);
            //}
        } catch (error) {
            router.push("/login");
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
        }
    }
    return(
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <Card title="Sign up ">
        <div>
        <TextInput placeholder={"suraj kumar"} label="username" onChange={(value) => {setUsername(value)}} />
        </div>
        <div>
        <TextInput placeholder={"1234567890"} label="Number" onChange={(value) => {setNumber(value)}} />
        </div>
        <div>
        <TextInput placeholder={"strong password"} label="password" onChange={(value) => {setPassword(value)}} />
        </div>
        <button onClick={onclick}>SIGN UP</button>
        
       </Card> 
        </div>   
        
    )
} 