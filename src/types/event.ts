export type TEventData = {
    type: string,
    owner?: string,
    plantedAt?: number,
    metadataURI?: string,
    latitude?: number,
    longitude?: number,
    tokenId?: number,
    oldOwner?: string,
    newOwner?: string,
    sender?: string,
    recipient?: string,
    from: string,
    amount?: string,
    blockNumber: number,
};


export type HumanReadableEvent = {
    message: string,
    color: 'green' | 'red',
    icon?: string,
    timestamp?: number,
}