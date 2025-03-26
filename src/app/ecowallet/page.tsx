"use client"; 

import TokenBalance from "@/components/TokenBalance";
import NFTCollection from "@/components/NFTCollection";
import TransactionList from "@/components/TransactionList";
import RedeemItem from "@/components/RedeemItem";
import NFTCard from "@/components/NFTCard";

export default function Page() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
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

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Redeem Tokens</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <RedeemItem name="Bamboo Water Bottle" eco={200} />
            <RedeemItem name="Organic Tote Bag" eco={150} />
            <RedeemItem name="Metal Straw Set" eco={100} />
          </div>
        </div>

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
