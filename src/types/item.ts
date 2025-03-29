export type RedeemItem = {
    itemId: number,
    title: string,
    description: string,
    price: number,
    imageUrl: string
}


export type TRedeemItem = {
    redemptionId: number,
    walletAddress: string,
    itemId: number,
    redeemedAt: string,
}

export type TRedemption = RedeemItem & {
    Redemption: TRedeemItem[]
}
