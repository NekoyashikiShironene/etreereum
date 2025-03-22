export default function TokenBalance() {
    return (
      <div className="bg-green-100 rounded-xl p-6 shadow">
        <h3 className="text-lg font-medium mb-2">Token Balance</h3>
        <p className="text-3xl font-bold text-green-700">2,450 ECO</p>
        <div className="flex gap-2 mt-4">
          <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">+ Add Tokens</button>
          <button className="border px-4 py-1 rounded">↔ Transfer</button>
        </div>
      </div>
    );
  }
  