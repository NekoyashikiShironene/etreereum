"use server";
import { uploadFile } from "@/utils/uploadFile";
import prisma from "@/db/prisma";

export async function requestMintTree(formData: FormData) {
  // Extract form data
  const accountAddress = formData.get('accountAddress') as string;
  const latitude = parseFloat(formData.get('latitude') as string);
  const longitude = parseFloat(formData.get('longitude') as string);
  const treeType = formData.get('treeType') as string;
  const plantedAt = formData.get('plantedAt') as string;
  const plantedAtTimestamp = formData.get('plantedAtTimestamp') as string;
  const treeImage = formData.get('treeImage') as File;


  if (!accountAddress || isNaN(latitude) || isNaN(longitude) || !treeType || !plantedAt || !treeImage) {
    return { message: 'All fields are required.' };
  }

  try {
    await prisma.user.upsert({
      where: {
        walletAddress: accountAddress
      },
      update: {
        walletAddress: accountAddress
      },
      create: {
        walletAddress: accountAddress
      }
    });

    const file_name = `${plantedAtTimestamp}-${accountAddress}`;

    await prisma.planting.create({
      data: {
        ownerAddress: accountAddress,
        typeId: Number(treeType),
        treeImageUrl: `${process.env.NEXT_PUBLIC_URL}/uploads/${file_name}.jpg`,
        latitude,
        longitude,
        plantedAt,
      }
    })

    await uploadFile(treeImage, file_name);

    return { message: 'Tree minted successfully.', error: false };
  } catch (err: unknown) {
    return { message: err as string, error: true }
  }
}

export async function approveMintTree(formData: FormData) {
  // Extract form data

  const latitude = parseFloat(formData.get('latitude') as string);
  const longitude = parseFloat(formData.get('longitude') as string);
  const plantingId = formData.get('plantingId') as string;


  if (isNaN(latitude) || isNaN(longitude)) {
    return { message: 'All fields are required.' };
  }

  try {
    await prisma.planting.update({
      where: {
        treeId: Number(plantingId)
      },

      data: {
        validationStatus: 1,
        latitude: latitude,
        longitude: longitude
      }
    })


    return { message: 'Tree minted successfully.', error: false };
  } catch (err: unknown) {
    return { message: String(err), error: true }
  }
}

export async function rejectMintTree(formData: FormData) {
  
  const plantingId = formData.get('plantingId') as string;

  try {
    await prisma.planting.update({
      where: {
        treeId: Number(plantingId)
      },

      data: {
        validationStatus: 2
      }
    })


    return { message: 'Tree minted successfully.', error: false };
  } catch (err: unknown) {
    return { message: String(err), error: true }
  }
}

export async function changeTreeOwner(formData: FormData) {
  const plantingId = Number(formData.get('plantingId') as string);
  const newOwnerAddress = formData.get('newOwnerAddress') as string;

  try {
    await prisma.planting.update({
      where: {
        treeId: Number(plantingId)
      },

      data: {
        ownerAddress: newOwnerAddress
      }
    })


    return { message: 'Changed owner successfully.', error: false };
  } catch (err: unknown) {
    return { message: String(err), error: true }
  }
}


export async function burnTree(formData: FormData) {
  const plantingId = formData.get("plantingId") as string;
  try {
    await prisma.planting.delete({
      where: {
        treeId: Number(plantingId)
      }
    })
  } catch (e: unknown) {
    return { message: String(e), error: true }
  }

}

export async function redeemItem(formData: FormData) {
  const address = formData.get("address") as string;
  const itemId = formData.get("itemId") as string;
  try {
    const item = await prisma.redemption.findFirst({
      where: {
        walletAddress: address,
        itemId: Number(itemId)
      }
    });

    if (item)
      throw new Error("User has already redeemed");

    await prisma.redemption.create({
      data: {
        walletAddress: address,
        itemId: Number(itemId)
      }
    })
  } catch (e: unknown) {
    return { message: String(e), error: true }
  }
}