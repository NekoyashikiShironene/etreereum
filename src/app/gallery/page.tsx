import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import NFTGallery from "@/components/NFTGallery"

// Tree NFT data
const treeNFTs = [
  { id: 1001, name: "Takhian Thong", image: "/placeholder.svg?height=200&width=200" },
  { id: 1002, name: "Siamese Rosewood", image: "/placeholder.svg?height=200&width=200" },
  { id: 1003, name: "Burma Padauk", image: "/placeholder.svg?height=200&width=200" },
  { id: 1004, name: "Teak", image: "/placeholder.svg?height=200&width=200" },
  { id: 1005, name: "Yang Na", image: "/placeholder.svg?height=200&width=200" },
  { id: 1006, name: "Makha Mong", image: "/placeholder.svg?height=200&width=200" },
  { id: 1007, name: "Burmese Sal", image: "/placeholder.svg?height=200&width=200" },
  { id: 1008, name: "Lagerstroemia", image: "/placeholder.svg?height=200&width=200" },
  { id: 1009, name: "White Siris", image: "/placeholder.svg?height=200&width=200" },
  { id: 1010, name: "Pink Shower Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1011, name: "Banyan Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1012, name: "Bodhi Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1013, name: "Neem Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1014, name: "Bamboo", image: "/placeholder.svg?height=200&width=200" },
  { id: 1015, name: "Eucalyptus", image: "/placeholder.svg?height=200&width=200" },
  { id: 1016, name: "Mangrove", image: "/placeholder.svg?height=200&width=200" },
  { id: 1017, name: "Coconut Palm", image: "/placeholder.svg?height=200&width=200" },
  { id: 1018, name: "Jackfruit Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1019, name: "Mango Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1020, name: "Durian Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1021, name: "Rambutan Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1022, name: "Longan Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1023, name: "Lychee Tree", image: "/placeholder.svg?height=200&width=200" },
  { id: 1024, name: "Mangosteen Tree", image: "/placeholder.svg?height=200&width=200" },
]

export default function NFTGalleryPage() {


  return (
    <div className="container mx-auto py-8 px-4 pt-[5rem]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Tree NFT Collection</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of unique tree NFTs. Each NFT represents a real tree that has been planted to reduce
          carbon footprint.
        </p>
      </div>
      
      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex gap-2 mb-4 sm:mb-0">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            All Trees
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Rare
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Common
          </Badge>
        </div>
        <select className="border rounded-md p-2 text-sm">
          <option>Sort by: Latest</option>
          <option>Sort by: Name (A-Z)</option>
          <option>Sort by: Name (Z-A)</option>
          <option>Sort by: ID (Ascending)</option>
          <option>Sort by: ID (Descending)</option>
        </select>
      </div>
      
      <NFTGallery />
      
    </div>
  )
}

