import { Contract } from "ethers"

export type TContract = {
    instance: Contract | null,
    role: string,
    balance: string
}

export type TEtreereumContract = TContract & {  
}

export type TNFTreeContract = TContract & {
    plantedAt: number,
    latitude: number,
    longitude: number,
    metadataURI: string
}

