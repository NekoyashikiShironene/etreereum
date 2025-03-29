import type React from "react"
import { Leaf } from "lucide-react"
import RedeemCard from '@/components/RedeemCard';

export default async function RedeemPage() {

  return (
    <div className="container mx-auto py-8 pt-[5rem]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Redeem Your ECO Tokens</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Use your earned tokens to redeem eco-friendly products or contribute to tree planting initiatives and reduce
          your carbon footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full mt-6 mb-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            Eco-Friendly Products
          </h2>
          <div className="h-1 w-20 bg-green-500 rounded mt-1"></div>
        </div>
        <RedeemCard />
      </div>
    </div>
  )
}


