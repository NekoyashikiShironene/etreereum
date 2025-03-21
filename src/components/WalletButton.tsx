"use client";
import React, { useEffect, useState } from 'react'

export default function WalletButton() {
    const [accountAddress, setAccountAddress] = useState<string | undefined>();

    const connectWallet = async () => {
        const { ethereum } = window;
        if (typeof ethereum !== undefined) {
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                setAccountAddress(accounts[0]);
                
            } catch (e: unknown) {
                console.log("Connect failed:", e)
            }

        } else {
            window.open("https://metamask.io/download", "_blank");
        }
    }

    const handleAccountChange = (accounts: string[]) => {
        if (accounts.length === 0) {
            setAccountAddress(undefined);
        } else {
            setAccountAddress(accounts[0]);
        }
    };

    useEffect(() => {
        const { ethereum } = window;
        if (typeof ethereum !== undefined) {
            ethereum.on('accountsChanged', handleAccountChange);
            return () => {
                ethereum!.removeListener('accountsChanged', handleAccountChange);
            }
        }
    }, [])

    return (
        <button onClick={() => connectWallet()}>{accountAddress ?? 'WalletConnect'}</button>
    )
}
