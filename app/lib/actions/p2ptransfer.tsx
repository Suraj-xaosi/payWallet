"use server";

import { cookies } from "next/headers";
import { verifyToken } from "../auth";
import { prisma } from "@/prismaclient";

export async function p2ptransfer(to: string, amount: number) {
    if (!to || typeof to !== "string" || amount <= 0) {
        return { message: "Invalid input parameters" };
    }

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

    const toUser = await prisma.user.findFirst({
        where: { number: to },
    });
    
    if(toUser){
        if(from){
            try {
                await prisma.$transaction(async (tx) => {        
                    const fromBalance = await tx.balance.findUnique({
                        where: { id: Number(from.balanceId) },
                    });
            
                    if (!fromBalance || fromBalance.amount < amount) {
                        throw new Error("Insufficient funds");
                    }
            
                    await tx.balance.update({
                        where: { id: Number(from.balanceId) },
                        data: { amount: { decrement: amount } },
                    });
                    if(toUser.balanceId){
                        await tx.balance.update({
                            where: { id:Number( toUser.balanceId) },
                            data: { amount: { increment: amount } },
                        });  
                    }
                    await tx.p2precords.create({
                        data: {
                            fromUserId: Number(from.id),
                            toUserId: Number(toUser.id),
                            amount: amount,
                            timestamp: new Date(),
                        },
                    
                    });
                });
                return true;
            } 
            catch (error) {
                console.error("Transaction failed:", error);
                return false;
            }
        }else{
            console.log("from user is not founded")
            return false
        }
    }else{
        console.log("to user is not founded")
        return false;
    }
   
    
    
}

