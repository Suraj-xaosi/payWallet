"use client"

import { useEffect, useState } from "react";
import prevusers from "@/app/lib/actions/prevusers";
import Selectuser from "./Selectuser";
import { useDispatch, useSelector } from "react-redux";
import { adduser, removeuser } from "@/app/reducers/selectedpeepSlice";

import { RootState } from "@/app/store/store";

export default function Allusers() {
    const [users, setUsers] = useState<any[]>([]);
    const dispatch =useDispatch();

    const selectedUsers: { id: number; name: string; number: string; position?: { x: number; y: number } }[] = useSelector(
        (state: RootState) => state.selectedpeep
    );

    useEffect(() => {
        async function fetchUsers() {
            const all = await prevusers();
            setUsers(all);
            console.log(all);
        }
        fetchUsers();
    }, []);

    if (!users || users.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-blue-100">
                <div>No other users</div>
            </div>
        );
    }
    function hashfunction(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32-bit integer
        }
        return hash;
    }
    function addSelectedUser(name: string, number: string) {
        const id = Math.random() * 1000000; // Generate a random ID
        const x: number = 200 + Math.abs(hashfunction(name) % 700); // 200..899
        const y: number = 200 + Math.abs(hashfunction(number) % 700); // 200..899
        dispatch(adduser({ id, name, number, position: { x, y } }));
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
            <div className="flex flex-wrap justify-center">
                {users.map((tx,i) => (
                    <div
                        key={tx.toUser.id}
                        className="cursor-pointer bg-blue-300 rounded shadow p-4 m-2 w-64 text-center hover:bg-blue-400"
                        onClick={() => addSelectedUser(tx.toUser.username, tx.toUser.number)}
                    >
                        <div className="font-bold bg-blue-400 rounded">{tx.toUser.username}</div>
                        <div>{tx.toUser.number}</div>
                    </div>
                ))}
            </div>
            {selectedUsers.length > 0 && (
                <div className="mt-6 relative" style={{ height: '1000px', width: '1000px' }}>
                    <h2 className="text-lg font-bold">Selected Users:</h2>
                    <ul className="list-disc pl-5">
                        {selectedUsers.map((user, i) =>
                            <Selectuser key={user.id} id={user.id} name={user.name} number={user.number} positionI={user.position ?? { x: 500, y: 500 }} />
                        )}
                    </ul>
                </div>
            )}

        </div>
    );
}




