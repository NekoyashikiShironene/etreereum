import { Badge } from "@/components/ui/badge"
import NFTGallery from "@/components/NFTGallery"

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

