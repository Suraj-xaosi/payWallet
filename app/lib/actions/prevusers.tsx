"use server"
import { prisma } from "@/prismaclient";
export default async function prevusers() {
    const prevusers = await prisma.p2precords.findMany({
        distinct: ['toUserId'],
        select: {
            toUser: { select: { number: true, username: true } },
        },
    });

    // Add a generated id to each user
    return prevusers.map((user, idx) => ({
        ...user,
        id: idx + 1, // or idx if you want to start from 0
    }));
}