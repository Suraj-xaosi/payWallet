import TransferM from "@/components/TransferM";

export default async function P2PPage() {
  return (
    <div className="min-h-screen w-full max-w-screen-lg bg-gray-100 flex flex-col items-center py-10">
      {/* Header */}
      <header className="bg-blue-600 text-white w-full py-4 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">P2P Transfer</h1>
        </div>
      </header>

      {/* Send Money Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Money</h2>
        <TransferM />
      </div>
    </div>
  );
}