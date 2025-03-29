export type PlantingTree = {
    treeId: number,
    typeId: number,
    ownerAddress: string,
    latitude: number,
    longitude: number,
    treeImageUrl: string,
    plantedAt: string,
    validationStatus: number
}

export type TTreeType = {
    typeId: number,
    type: string,
    value: number
}

export type TreeMetadata = {
    treeId: number,
    typeId: number,
    ownerAddress: string,
    latitude: number,
    longitude: number,
    treeImageUrl: string,
    plantedAt: string,
    validationStatus: number
}

export type Tree = {
    tokenId: number;
    plantedAt: number;
    metadataURI: string;
    metadata: TreeMetadata;
    gpsLocation: { latitude: number; longitude: number };
    treeImageUrl: string;
};
