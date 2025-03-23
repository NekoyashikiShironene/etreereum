"use client";
import { useWallet } from '@/contexts/WalletContext';

export default function WalletButton() {
    const { accountAddress, connectWallet } = useWallet();

    return (
        <button onClick={() => connectWallet()}>{accountAddress ?? 'WalletConnect'}</button>
    )
}
