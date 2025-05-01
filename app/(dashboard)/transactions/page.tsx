import { verifyToken } from "@/app/lib/auth";
import Trackcard from "@/components/Trackcard";
import { cookies } from "next/headers";

export default async function TransactionsPage() {
  const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;
    const user = token ? await verifyToken(token) : null;
  
    if (!user) {
      return <div className="text-center text-red-500">User not authenticated</div>;
    }
  
    
    const n:string = user.number;
  
  return (
    <div className="min-h-screen w-full max-w-screen-lg bg-gray-100 flex flex-col items-center py-10">
      {/* Header */}
      <header className="bg-blue-600 text-white w-full py-4 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>
      </header>

      {/* Transactions Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full  px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Transactions</h2>
        <Trackcard n={n} />
      </div>
    </div>
  );
}