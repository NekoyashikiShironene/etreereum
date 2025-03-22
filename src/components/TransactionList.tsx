export default function TransactionList() {
    return (
      <div className="bg-gray-100 rounded-xl p-6 shadow">
        <h3 className="text-lg font-medium mb-2">Transaction History</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-green-700">
            <span>+100 ECO (Tree Planting)</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>-60 ECO (Eco Store Purchase)</span>
            <span className="text-sm text-gray-500">Yesterday</span>
          </div>
        </div>
      </div>
    );
  }
  