import { useContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";
import { cn } from "@/lib/utils";
import { toHumanReadableEvents } from "@/utils/filter";

export default function TransactionList() {
  const { selectedAccount } = useWallet();
  const { events } = useContract();

  const filteredEvents = toHumanReadableEvents(events, selectedAccount ?? '');

  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow">
      <h3 className="text-lg font-medium mb-2">Transaction History</h3>
      <div className="flex flex-col gap-2 h-[16rem] overflow-auto">
        {
          filteredEvents.map((event, index) => (
            <div key={index} className={cn("flex justify-between", {
              "text-green-700": event.color === "green",
              "text-red-700": event.color === "red"
            })}>
              <span>{event.icon} {event.message}</span>
              <span className="text-sm text-gray-500">Block ID: {event.timestamp}</span>
            </div>
          ))
        }

      </div>
    </div>
  );

}
