export type PlantingTree = {
    treeId: number,
    typeId: number,
    ownerAddress: string,
    latitude: number,
    longitude: number,
    treeImageUrl: string,
    plantedAt: string,
    validationStatus: boolean
}

export type TTreeType = {
    typeId: number,
    type: string,
    value: number
}