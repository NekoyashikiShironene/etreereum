export type PlantingTree = {
    treeId: number,
    typeId: number,
    ownerAddress: string,
    latitude: number,
    longitude: number,
    treeImageUrl: string,
    plantedAt: Date,
    validationStatus: boolean
}