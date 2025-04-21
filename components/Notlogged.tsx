"use client"

import { redirect } from "next/navigation";
import { Button } from "./Button";

import Loginpage from "@/pages/Loginpage";


export default function Notlogged(){

    return (
        <>
            <h1>please log in </h1>
            <Loginpage/>
            <div>
                if you dont have accont then <Button onclick={()=>{redirect('/signup')}}>Sign up</Button>
            </div>
        </>
    );
}



