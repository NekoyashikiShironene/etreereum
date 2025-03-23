"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ethers, formatUnits } from "ethers";
import type { BrowserProvider, Signer, Contract } from "ethers";
import { useWallet } from "@/contexts/WalletContext";

import treeCoinContract from "../../hardhat/artifacts/contracts/TreeCoin.sol/TreeCoin.json" with { type: "json" };
import treeContract from "../../hardhat/artifacts/contracts/Tree.sol/NFTree.json" with { type: "json" };

const TREE_COIN_ADDRESS = process.env.NEXT_PUBLIC_TREE_COIN_ADDRESS ?? "";
const TREE_ADDRESS = process.env.NEXT_PUBLIC_TREE_ADDRESS ?? "";

type TContractContext = {
    treeCoinContract: Contract | null;
    treeContract: Contract | null;
    provider: BrowserProvider | null;
    signer: Signer | null;
    balance: string;
    fetchBalance: () => Promise<void>;
}

const ContractContext = createContext<TContractContext | undefined>(undefined);

export function ContractProvider({ children }: { children: ReactNode }) {
    const { accountAddress } = useWallet();
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [signer, setSigner] = useState<Signer | null>(null);
    const [treeCoin, setTreeCoin] = useState<Contract | null>(null);
    const [tree, setTree] = useState<Contract | null>(null);
    const [balance, setBalance] = useState<string>("0");

    useEffect(() => {
        if (!window.ethereum) return;
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(web3Provider);

        if (accountAddress) {
            web3Provider.getSigner().then((signer) => {
                setSigner(signer);

                const coinContract = new ethers.Contract(TREE_COIN_ADDRESS, treeCoinContract.abi, signer);
                setTreeCoin(coinContract);

                const nftContract = new ethers.Contract(TREE_ADDRESS, treeContract.abi, signer);
                setTree(nftContract);
            });
        }
    }, [accountAddress]);



    useEffect(() => {
        if (!treeCoin) return;
        
        const fetchBalance = async () => {
            if (!treeCoin || !accountAddress) return;
            try {
                const newBalance = await treeCoin.balanceOf(accountAddress);
                setBalance(formatUnits(newBalance, 18));
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
        treeCoin.on("newTransaction", (sender, recipient, amount, event) => {
            if (sender.toLowerCase() === accountAddress || recipient.toLowerCase() === accountAddress) {
                console.log(`Transfer detected\n from ${sender}\nto: ${recipient}\namount: ${amount} `);
                console.log("Event Data:", event);
                fetchBalance();
            }
        });

        return () => {
            treeCoin.removeAllListeners("Transfer");
        };
    }, [treeCoin, accountAddress]);

    return (
        <ContractContext.Provider value={{ treeCoinContract: treeCoin, treeContract: tree, provider, signer, balance }}>
            {children}
        </ContractContext.Provider>
    );
}

export function useContract() {
    const context = useContext(ContractContext);
    if (!context) {
        throw new Error("useContract must be used within a ContractProvider");
    }
    return context;
}

