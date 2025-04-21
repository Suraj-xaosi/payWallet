"use server";

import { cookies } from "next/headers";
import { verifyToken } from "../auth";
import { prisma } from "@/prismaclient";

export async function info() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;
    const user = token ? await verifyToken(token) : null;

    if (!user) {
        return { message: "User not authenticated" };
    }

    const usernumber = user.number;

    const from =  await prisma.user.findFirst({
        where: { number: usernumber },
    });
    
    if(from){
        try {
                   
            const fromBalance = await prisma.balance.findUnique({
                where: { id: Number(from.balanceId) },
            });    
            
            return { message: "User info fetched successfully", balance: fromBalance?.amount };
        } 
        catch (error) {
            console.error( error);
            return { message: "Error fetching user info" };
                
        }
    }else{
        console.log("from user is not founded")
            
        return { message: "User not found" };
    }
    
}