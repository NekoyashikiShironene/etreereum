import prisma from "@/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const trees = await prisma.tree.findMany();

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white text-center">
      <section className="px-4 py-12">
        <h2 className="text-4xl font-bold mb-4">Plant Trees, Earn Rewards!</h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Join our mission to make the world greener while earning unique NFT rewards for your environmental impact.
        </p>
        <Link href="/ecowallet">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Start Planting 🌱
          </button>
        </Link>
      </section>

      <section className="flex justify-center bg-green-100 py-6 px-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex-1 text-center border-r border-green-300 last:border-r-0">
          <h3 className="text-2xl font-bold text-green-700">10,500+</h3>
          <p className="text-sm text-gray-600">Trees Planted 🌱</p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-2xl font-bold text-green-700">20,000+ kg</h3>
          <p className="text-sm text-gray-600">CO₂ Absorbed 🌿</p>
        </div>
      </section>

      <section className="py-12">
        <h3 className="text-2xl font-semibold mb-6">Tree NFT Collection</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {trees.map(tree => (
            <div
              key={tree.typeId}
              className="bg-white rounded-xl shadow p-4 w-40 text-center"
            >
              {
                <Image
                  src={`/trees/${tree.typeId}.jpg`}
                  alt={tree.type ?? 'default tree'}
                  width={100}
                  height={100}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
              }
              <div className="font-bold">{tree.type}</div>
              <div className="text-xs text-gray-500">#{tree.typeId}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
