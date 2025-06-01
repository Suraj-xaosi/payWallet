import { verifyToken } from "@/app/lib/auth";


import Balance from "@/components/Balance";
import LogoutButton from "@/components/logoutbutton";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    return <div className="text-center text-red-500">User not authenticated</div>;
  }

  const username = user.username;
  const number = user.number;

  return (
    <div className="min-h-screen w-full  bg-blue-100 flex flex-col items-center ">
      {/* Header */}
      <header className="bg-blue-600 text-white w-full py-4 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">PROFILE</h1>
        </div>
      </header>

      {/* User Info Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold text-gray-800">Welcome, {username}!</h2>
        <p className="text-gray-600 mt-2">Phone Number: <span className="font-medium">{number}</span></p>
      </div>

      {/* Balance Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-11/12 max-w-md">
        <h2 className="text-lg font-semibold text-gray-800">Your Balance</h2>
        <div className="mt-4">
          <Balance />
        </div>
      </div>

      

      {/* Logout Button */}
      <div className="mt-6">
        <LogoutButton />
      </div>

      
    </div>
  );
}

