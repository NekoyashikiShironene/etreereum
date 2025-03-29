import { Contract } from "ethers"

export type TContract = {
    instance: Contract | null,
    role: string,
    balance: string,
    admin: string[]
}

export type TEtreereumContract = TContract & {  
    totalSupply: string
}

export type TNFTreeContract = TContract & {
    plantedAt: number,
    latitude: number,
    longitude: number,
    metadataURI: string
}

