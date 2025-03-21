import prisma from "@/db/prisma";

async function main() {
  const trees = await prisma.tree.findMany({
    select: {
        type: true,
        value: true
    },
    skip: 3,
    take: 4
    
  });
  console.log(trees);
}

main();