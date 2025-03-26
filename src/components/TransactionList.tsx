import { useContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";

import { toHumanReadableEvents } from "@/utils/filter";

export default function TransactionList() {
  const { accountAddress } = useWallet();
  const { events } = useContract();

  const filteredEvents = toHumanReadableEvents(events, accountAddress ?? '');

  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow">
      <h3 className="text-lg font-medium mb-2">Transaction History</h3>
      <div className="flex flex-col gap-2">
        {
          filteredEvents.map((event, index) => (
            <div key={index} className="flex justify-between text-green-700">
              <span>{event.message}</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))
        }

      </div>
    </div>
  );

}
