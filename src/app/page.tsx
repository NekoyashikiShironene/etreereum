import prisma from "@/db/prisma";
import WalletButton from "@/components/WalletButton";

export default async function Home() {
  const trees = await prisma.tree.findMany();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <WalletButton />
      {
        trees.map(trees => <div key={trees.treeId}>{trees.type}</div>)
      }
        
    </div>
  );
}
