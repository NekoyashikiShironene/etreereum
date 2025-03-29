"use client"

import { parseUnits } from "ethers";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownUp, Flame, Leaf } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useContract } from "@/contexts/ContractContext";
import TransactionList from "./TransactionList";

export default function AdminTokenSupply() {
  const { selectedAccount, connectWallet } = useWallet();
  const { etreereumContract } = useContract();

  const [mintAddress, setMintAddress] = useState<string>(selectedAccount ?? "")
  const [mintAmount, setMintAmount] = useState<string>("")

  const [burnAddress, setBurnAddress] = useState<string>(selectedAccount ?? "")
  const [burnAmount, setBurnAmount] = useState<string>("")

  const [transferAddress, setTransferAddress] = useState<string>(selectedAccount ?? "")
  const [transferAmount, setTransferAmount] = useState<string>("")

  const handleMint = async () => {
    if (!etreereumContract.instance) return;
    try {
        const tx = await etreereumContract.instance.mint(mintAddress, parseUnits((mintAmount ?? 0).toString(), "ether"));
      } catch (e: unknown) {
        return toast.error("Minted failed", { description: String(e) });
      }
      setMintAddress("");
      toast.success("Minted successfully");
  }

  const handleBurn = async () => {
    if (!etreereumContract.instance) return;
    try {
        const tx = await etreereumContract.instance.burn(burnAddress, parseUnits((burnAmount ?? 0).toString(), "ether"));
      } catch (e: unknown) {
        return toast.error("Burned failed", { description: String(e) });
      }
      setBurnAddress("");
      toast.success("Burned successfully");

  }

  const handleTransfer = async () => {
    if (!etreereumContract.instance) return;

    try {
      const tx = await etreereumContract.instance.transfer(transferAddress, parseUnits((transferAmount ?? 0).toString(), "ether"));
    } catch (e: unknown) {
      return toast.error("Transfered failed", { description: String(e) });
    }
    setTransferAddress("");
    toast.success("Transfered successfully");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">ETR Token Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-green-50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Total Token Supply
            </CardTitle>
            <CardDescription>ETR token supply in the contract</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-700">{etreereumContract.totalSupply} ETR</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {selectedAccount
                ? `Connected: ${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`
                : "Not connected"}
            </p>
          </CardFooter>
        </Card>

        {!selectedAccount ? (
          <Card className="col-span-1 lg:col-span-2 bg-blue-50 shadow-md">
            <CardHeader>
              <CardTitle>Connect Wallet</CardTitle>
              <CardDescription>Connect your wallet to manage tokens</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-12">
              <Button size="lg" onClick={() => connectWallet()}>
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="col-span-1 lg:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle>Token Operations</CardTitle>
              <CardDescription>Mint, burn, or transfer ETR tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mint" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mint">Mint</TabsTrigger>
                  <TabsTrigger value="burn">Burn</TabsTrigger>
                  <TabsTrigger value="transfer">Transfer</TabsTrigger>
                </TabsList>

                <TabsContent value="mint" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="mint-address" className="text-right">
                        Address
                      </Label>
                      <Input
                        id="mint-address"
                        className="col-span-3"
                        placeholder="0x..."
                        value={mintAddress}
                        onChange={(e) => setMintAddress(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="mint-amount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="mint-amount"
                        className="col-span-3"
                        placeholder="0.0"
                        value={mintAmount}
                        onChange={(e) => setMintAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleMint} className="bg-green-600 hover:bg-green-700">
                        <Leaf className="mr-2 h-4 w-4" />
                        Mint Tokens
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="burn" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="burn-address" className="text-right">
                        Address
                      </Label>
                      <Input
                        id="burn-address"
                        className="col-span-3"
                        placeholder="0x..."
                        value={burnAddress}
                        onChange={(e) => setBurnAddress(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="burn-amount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="burn-amount"
                        className="col-span-3"
                        placeholder="0.0"
                        value={burnAmount}
                        onChange={(e) => setBurnAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleBurn} variant="destructive">
                        <Flame className="mr-2 h-4 w-4" />
                        Burn Tokens
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transfer" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="transfer-address" className="text-right">
                        Address
                      </Label>
                      <Input
                        id="transfer-address"
                        className="col-span-3"
                        placeholder="0x..."
                        value={transferAddress}
                        onChange={(e) => setTransferAddress(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="transfer-amount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="transfer-amount"
                        className="col-span-3"
                        placeholder="0.0"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleTransfer} variant="outline">
                        <ArrowDownUp className="mr-2 h-4 w-4" />
                        Transfer Tokens
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8">
        <TransactionList />
      </div>
    </div>
  )
}