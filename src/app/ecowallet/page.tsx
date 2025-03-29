"use client"; 

import TokenBalance from "@/components/TokenBalance";
import NFTCollection from "@/components/NFTCollection";
import TransactionList from "@/components/TransactionList";

export default function Page() {
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-[5rem]">
      <div className="p-6 sm:p-10 grid gap-10">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-green-100 p-6 rounded-2xl shadow-md">
            <TokenBalance />
          </div>
          <div className="bg-green-100 p-6 rounded-2xl shadow-md">
            <NFTCollection />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Transaction History</h2>
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
