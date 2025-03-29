import { useContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { filterMyTransactions, toHumanReadableEvents } from "@/utils/filter";

export default function TransactionList() {
  const { selectedAccount } = useWallet();
  const { events, etreereumContract } = useContract();


  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View recent token operations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="global">Global Transactions</TabsTrigger>
              <TabsTrigger value="my">My Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-4">
              <div className="bg-gray-100 rounded-xl p-6 shadow">
                <h3 className="text-lg font-medium mb-2">All Transactions</h3>
                <div className="flex flex-col gap-2 h-[16rem] overflow-auto">
                  {events.length > 0 ? (
                    toHumanReadableEvents(
                      events,
                      selectedAccount ?? '',
                      etreereumContract.role)
                      .map((event, index) => (
                        <div
                          key={index}
                          className={`flex justify-between ${event.color === "green" ? "text-green-700" : event.color === "red" ? "text-red-700" : ""
                            }`}
                        >
                          <span>
                            {event.icon} {event.message}
                          </span>
                          <span className="text-sm text-gray-500">Block ID: {event.timestamp}</span>
                        </div>
                      ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">No transaction history available</div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="my" className="space-y-4">
              <div className="bg-gray-100 rounded-xl p-6 shadow">
                <h3 className="text-lg font-medium mb-2">My Transactions</h3>
                <div className="flex flex-col gap-2 h-[16rem] overflow-auto">
                  {events.length ? (
                    toHumanReadableEvents(
                      filterMyTransactions(events, selectedAccount ?? '', etreereumContract.role),
                      selectedAccount ?? '',
                      etreereumContract.role)
                      .map((event, index) => (
                        <div
                          key={index}
                          className={`flex justify-between ${event.color === "green" ? "text-green-700" : event.color === "red" ? "text-red-700" : ""
                            }`}
                        >
                          <span>
                            {event.icon} {event.message}
                          </span>
                          <span className="text-sm text-gray-500">Block ID: {event.timestamp}</span>
                        </div>
                      ))
                  ) : (
                    <div className="text-center text-muted-foreground py-4">No personal transactions found</div>
                  )
                  }
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

}
