"use client";  // 

import TokenBalance from "@/components/TokenBalance";
import NFTCollection from "@/components/NFTCollection";
import TransactionList from "@/components/TransactionList";
import RedeemItem from "@/components/RedeemItem";
import NFTCard from "@/components/NFTCard";


import WalletButton from "@/components/WalletButton";

export default function Page() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Left: Home Button & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-gray-600 hover:text-green-600 font-medium"
          >
            ⬅ Home
          </button>
          <span className="text-xl font-semibold text-gray-700">EcoWallet</span>
        </div>

        {/* Right: Navigation Links */}
        <div className="hidden sm:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-green-600"></a>
          <a href="#" className="text-gray-600 hover:text-green-600"></a>
          <a href="#" className="text-gray-600 hover:text-green-600"></a>
          <a href="#" className="text-gray-600 hover:text-green-600"></a>
        </div>
        <WalletButton />
      </nav>

      <div className="p-6 sm:p-10 grid gap-10">
        {/* Section: Top Summary */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-green-100 p-6 rounded-2xl shadow-md">
            <TokenBalance />
          </div>
          <div className="bg-green-100 p-6 rounded-2xl shadow-md">
            <NFTCollection />
          </div>
        </div>

        {/* Section: Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Transaction History</h2>
          <TransactionList />
        </div>

        {/* Section: Redeem Tokens */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Redeem Tokens</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <RedeemItem name="Bamboo Water Bottle" eco={200} />
            <RedeemItem name="Organic Tote Bag" eco={150} />
            <RedeemItem name="Metal Straw Set" eco={100} />
          </div>
        </div>

        {/* Section: NFT Gallery */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">NFT Gallery</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            <NFTCard name="Ancient Oak #001" month="Jan" />
            <NFTCard name="Cherry Blossom #023" month="Feb" />
            <NFTCard name="Red Maple #045" month="Mar" />
            <NFTCard name="Pine Tree #067" month="Apr" />
          </div>
        </div>
      </div>
    </div>
  );
}
