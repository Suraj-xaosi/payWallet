"use client"
import { Card } from "@/components/Card";
import { TextInput } from "@/components/TextInput";
//import { prisma } from "@/prismaclient";
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
            //console.log("login api calling")
            //const response = await axios.post("/api/login", {password,number});
            //console.log("login api responsed")
            //console.log(response.data);
            //const { username, balance} = response.data.user;
            //const chbalance:string=String(balance)
            //alert(balance);
            

            //i want balance of user here
            //if (response.status === 200) {
            const sessionresponse=await axios.post("/api/sessionauth", {/*password*/number,password,already});
            if (sessionresponse.status===200){
                console.log("session response is")
                console.log(sessionresponse.data)
                router.push('/')
            }
            else{
                {alert("session error")}
            }
            //} else {
            //    alert(response.data.message);
            //}
        } catch (error) {
            console.error("login error:", error);
            alert("An error occurred during logging in.");
        }
        
    }
     return(
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <Card title="login Page">
                
                <div>
                <TextInput placeholder={"1234567890"} label="Number" onChange={(value) => {setNumber(value)}} />
                </div>
                <div>
                <TextInput placeholder={"strong password"} label="password" onChange={(value) => {setPassword(value)}} />
                </div>
                <div>
                    <button onClick={onclick}>log in</button>
                </div>
                
                    
                
                </Card>
            </div>
        )
}