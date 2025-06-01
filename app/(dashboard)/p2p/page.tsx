import TransferM from "@/components/TransferM";

export default async function P2PPage() {
  return (
    <div className="min-h-screen w-full  bg-blue-100 flex flex-col items-center ">
      {/* Header */}
      <header className="bg-blue-600 text-white w-full py-4 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">P2P Transfer</h1>
        </div>
      </header>

      {/* Send Money Section */}
      <div className="bg-blue-100    min-h-screen w-full  px-70 py-30  ">
        <TransferM />
      </div>
        
       
      
    </div>
  );
}