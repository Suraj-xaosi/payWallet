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
    <div className="min-h-screen w-full  bg-blue-100 flex flex-col items-center ">
      {/* Header */}
      <header className="bg-blue-600 text-white w-full py-4 ">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">Transactions</h1>
        </div>
      </header>

      {/* Transactions Section */}
      <div className="bg-blue-100  p-6  w-full  px-4">
       
        <Trackcard n={n} />
      </div>
    </div>
  );
}