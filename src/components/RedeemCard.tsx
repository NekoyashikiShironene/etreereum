"use client";

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { useContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";
import type { TRedemption } from "@/types/item";
import { toast } from "sonner";
import { redeemItem } from "@/actions/nftree";
import { parseUnits } from "ethers";
import { useEffect, useState } from "react";

export default function RedeemCard() {
  const { selectedAccount } = useWallet();
  const { etreereumContract } = useContract();

  const [items, setItems] = useState<TRedemption[]>([]);
  
  async function fetchRedeemItem() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/redeemed/${selectedAccount}`);
      const json = await res.json();
      setItems(json.data);
    }

  useEffect(() => {
    etreereumContract.instance?.removeListener("NewTransaction", () => fetchRedeemItem());
    etreereumContract.instance?.on("NewTransaction", () => fetchRedeemItem());
    
    fetchRedeemItem();

    return () => {
      etreereumContract.instance?.removeListener("NewTransaction", () => fetchRedeemItem());
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount]);

  const handleRedeemItem = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!selectedAccount)
      return;

    e.preventDefault();
    toast.info("Redeeming...");
    const formData = new FormData(e.currentTarget);
    formData.set("address", selectedAccount);

    const price = formData.get("price") as string | null;

    try {
      await etreereumContract.instance?.transfer(
        process.env.NEXT_PUBLIC_ACCOUNT_OWNER_ADDRESS,
        parseUnits(price ?? "0", "ether")
      );

      const result = await redeemItem(formData);
      if (result?.error)
        throw new Error(result.message);

    } catch (e: unknown) {
      toast.error("Redeemed failed", { description: String(e) });
      return;
    }
    toast.success("Redeemed successfully!");
  }

  return (
    <>
      {
        items.map((item: TRedemption) => (
          <form key={item.itemId} onSubmit={handleRedeemItem}>
            <input type="hidden" name="itemId" id="itemId" value={item.itemId} />
            <input type="hidden" name="price" id="price" value={item.price} />
            <Card className={`overflow-hidden border-green-500 border-2`}>
              <div className="relative h-48 w-full bg-muted">
                <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                { /* icon */}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
                  {item.price} ETR
                </Badge>
                <RedeemButton item={item} />
              </CardFooter>
            </Card>
          </form>
        ))
      }
    </>
  )

}

function RedeemButton({ item }: { item: TRedemption }) {
  const { selectedAccount, connectWallet } = useWallet();
  if (!selectedAccount)
    return <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer" type="button" onClick={() => connectWallet()}>Connect wallet to redeem</Button>

  if (item.Redemption.length)
    return <Button className="bg-gray-400 hover:bg-green-700 cursor-pointer text-white" disabled>Redeemed</Button>

  return <Button className="bg-green-600 hover:bg-green-700 cursor-pointer" type="submit">Redeem</Button>

}