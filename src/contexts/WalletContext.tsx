"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type TWalletContext = {
    accounts: string[]; 
    selectedAccount: string | undefined;
    connectWallet: () => Promise<void>;
    selectAccount: (account: string) => void;
};

const WalletContext = createContext<TWalletContext | undefined>(undefined);

export default function WalletProvider({ children }: { children: React.ReactNode }) {
    const [accounts, setAccounts] = useState<string[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string | undefined>();

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("MetaMask not detected! Please install MetaMask.");
            window.open("https://metamask.io/download", "_blank");
            return;
        }

        try {
            const accs: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccounts(accs);
            setSelectedAccount(accs[0]);
        } catch (error) {
            console.error("Connect failed:", error);
        }
    };

    const handleAccountChange = (accs: string[]) => {
        setAccounts(accs);
        setSelectedAccount(accs[0] || undefined);
    };

    const selectAccount = (account: string) => {
        setSelectedAccount(account);
    };

    useEffect(() => {
        if (!window.ethereum) return;
        window.ethereum.on("accountsChanged", handleAccountChange);
        return () => {
            window.ethereum.removeListener("accountsChanged", handleAccountChange);
        };
    }, []);

    return (
        <WalletContext.Provider value={{ accounts, selectedAccount, connectWallet, selectAccount }}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) throw new Error("useWallet must be used within a WalletProvider");
    return context;
}
