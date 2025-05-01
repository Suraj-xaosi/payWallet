"use client";
import { info } from "@/app/lib/actions/info";
import { Card } from "./Card";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";




export default function Balance() {
    const [balance, setBalance] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const count = useSelector((state: RootState) => state.count);     
    const dispatch = useDispatch();
    
    useEffect(() => {
        const controller = new AbortController();

        async function fetchBalance() {
            try {
                const res = await info();
                if (res && typeof res.balance === "number") {
                    setBalance(res.balance);
                    setError(null); // Clear any previous errors
                } else {
                    setError("Invalid balance data received");
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchBalance();

        return () => {
            controller.abort(); // Cleanup API call on unmount or dependency change
        };
    }, [count]);

    if (balance === null && error === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Card title="Balance">
                {balance !== null ? `$${balance.toFixed(2)}` : "Loading..."}
            </Card>
            
            
        </div>
    );
}