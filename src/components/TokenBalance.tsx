"use client"

import { parseUnits } from "ethers";
import { useContract } from "@/contexts/ContractContext";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useWallet } from "@/contexts/WalletContext";

export default function TokenBalance() {
  const { selectedAccount, connectWallet } = useWallet();
  const { etreereumContract } = useContract();
  const { instance: etreereum, balance } = etreereumContract;

  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleTransfer = async () => {
    if (!etreereum) return;

    try {
      const tx = await etreereum.transfer(address, parseUnits((amount ?? 0).toString(), "ether"));
    } catch (e: unknown) {
      return toast.error("Transfered failed", { description: String(e) });
    }
    toast.success("Transfered successfully");
  }

  return (
    <div className="bg-green-100 rounded-xl p-6 shadow">
      <h3 className="text-lg font-medium mb-2">Token Balance</h3>
      <p className="text-3xl font-bold text-green-700">{balance} ETR</p>
      <div className="flex gap-2 mt-4">
        {
          selectedAccount ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">↔ Transfer</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Transfer ETR</DialogTitle>
                  <DialogDescription>
                    Send ETR to another account
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      className="col-span-3"
                      placeholder="0x..."
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      defaultValue="5"
                      className="col-span-3"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => handleTransfer()} >Transfer</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Button variant="outline" onClick={() => connectWallet()}>↔ Connect wallet to transfer</Button>
          )
        }


      </div>
    </div>
  );
}
