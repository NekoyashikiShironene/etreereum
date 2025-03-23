"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type TWalletContext = {
    accountAddress: string | undefined,
    connectWallet: () => Promise<void>,
}

const WalletContext = createContext<TWalletContext | undefined>(undefined);

export default function WalletProvider({ children }: { children: React.ReactNode }) {
    const [accountAddress, setAccountAddress] = useState<string | undefined>();
    const connectWallet = async () => {
        if (typeof window.ethereum !== undefined) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
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
        <WalletContext.Provider value={{ accountAddress, connectWallet }}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (!context)
        throw new Error("useWallet must be used within a WalletProvider");

    return context;
}