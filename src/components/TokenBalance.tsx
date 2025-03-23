import { parseUnits } from "ethers";

import { useContract } from "@/contexts/ContractContext";


export default function TokenBalance() {
  const { treeCoinContract, balance } = useContract();
  const handleTransfer = async () => {
    if (!treeCoinContract) return;

    const address = prompt("Enter address");
    const amount = prompt("Enter amount");

    try {
      const tx = await treeCoinContract.transfer(address, parseUnits((amount ?? 0).toString(), "ether"));
    } catch (e: unknown) {
      alert("Failed: " + e);
    }


  }

  return (
    <div className="bg-green-100 rounded-xl p-6 shadow">
      <h3 className="text-lg font-medium mb-2">Token Balance</h3>
      <p className="text-3xl font-bold text-green-700">{balance} ETR</p>
      <div className="flex gap-2 mt-4">
        <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
          + Add Tokens
        </button>
        <button onClick={() => handleTransfer()} className="border px-4 py-1 rounded">↔ Transfer</button>
      </div>
    </div>
  );
}
