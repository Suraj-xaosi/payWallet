"use server";

import { cookies } from "next/headers";
import { verifyToken } from "../auth";
import { prisma } from "@/prismaclient";

export async function getInfo() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;
    const user = token ? await verifyToken(token) : null;

    if (!user) {
        return [];
    }

    const userad = await prisma.user.findFirst({
        where: { number: user.number },
    });

    if (!userad) {
        return [];
    }

    const transactions = await prisma.p2precords.findMany({
        where: {
            OR: [
                { fromUserId: userad.id }, // First condition
                { toUserId: userad.id },  // Second condition
            ],
        },
        select: {
            amount: true, // Include the amount
            timestamp: true, // Include the timestamp
            fromUser: { select: { number: true } }, // Include only the number from fromUser
            toUser: { select: { number: true } }, // Include only the number from toUser
        },
    });

    // Convert the timestamp to ISO string format
    const formattedTransactions = transactions.map((transaction) => ({
        ...transaction,
        timestamp: transaction.timestamp.toISOString(), // Convert Date to string
    }));

    return formattedTransactions;
}
