"use client";

import { redirect } from "next/navigation";
import { Button } from "./Button";
import Loginpage from "@/pages/Loginpage";

export default function Notlogged() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      {/* Card Container */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h1>
        <p className="text-gray-600 mb-6">
          You need to log in to access this page. If you don’t have an account, you can sign up below.
        </p>

        {/* Login Section */}
        <div className="mb-6">
          <Loginpage />
        </div>

        {/* Sign Up Section */}
        <div>
          <p className="text-gray-600 mb-2">Don’t have an account?</p>
          <Button
            onclick={() => {
              redirect("/signup");
            }}
            
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}



