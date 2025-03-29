"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ethers, formatUnits } from "ethers";
import type { BrowserProvider, Signer } from "ethers";
import type { TEtreereumContract, TNFTreeContract } from "@/types/contract";
import type { TEventData } from "@/types/event";
import { useWallet } from "@/contexts/WalletContext";

import treeCoinContract from "../../hardhat/artifacts/contracts/TreeCoin.sol/TreeCoin.json" with { type: "json" };
import treeContract from "../../hardhat/artifacts/contracts/Tree.sol/NFTree.json" with { type: "json" };

const TREE_COIN_ADDRESS = process.env.NEXT_PUBLIC_TREE_COIN_ADDRESS ?? "";
const TREE_ADDRESS = process.env.NEXT_PUBLIC_TREE_ADDRESS ?? "";

type TContractContext = {
    etreereumContract: TEtreereumContract,
    nftreeContract: TNFTreeContract,
    events: TEventData[],
    provider: BrowserProvider | null,
    signer: Signer | null,
}

const ContractContext = createContext<TContractContext | undefined>(undefined);

export function ContractProvider({ children }: { children: ReactNode }) {
    const { selectedAccount } = useWallet();
    const [provider, setProvider] = useState<BrowserProvider | null>(null);
    const [signer, setSigner] = useState<Signer | null>(null);
    const [events, setEvents] = useState<TEventData[]>([]);

    const [etreereumContract, setEtreereumContract] = useState<TEtreereumContract>({
        instance: null,
        role: "user",
        balance: "-",
        admin: []
    });

    const [nftreeContract, setNFTreeContract] = useState<TNFTreeContract>({
        instance: null,
        role: "user",
        balance: "-",
        plantedAt: 0,
        latitude: 0,
        longitude: 0,
        metadataURI: "",
        admin: []
    });

    const fetchEvent = async () => {
        if (!etreereumContract.instance || !nftreeContract.instance) return;

        const [mintEvents, burnEvents, ownerEvents, transactionEvents] = await Promise.all([
            nftreeContract.instance.queryFilter("MintTree", 0, "latest"),
            nftreeContract.instance.queryFilter("BurnTree", 0, "latest"),
            nftreeContract.instance.queryFilter("ChangeOwner", 0, "latest"),
            etreereumContract.instance.queryFilter("NewTransaction", 0, "latest")
        ]);

        const allEvents: TEventData[] = [
            ...(mintEvents ?? []).map(e => ({
                type: "MintTree",
                owner: e.args.owner,
                plantedAt: Number(e.args.plantedAt),
                metadataURI: e.args.metadataURI,
                latitude: Number(e.args.latitude),
                longitude: Number(e.args.longitude),
                blockNumber: e.blockNumber
            })),
            ...(burnEvents ?? []).map(e => ({
                type: "BurnTree",
                owner: e.args.owner,
                tokenId: Number(e.args.tokenId),
                latitude: Number(e.args.latitude),
                longitude: Number(e.args.longitude),
                blockNumber: e.blockNumber
            })),
            ...(ownerEvents ?? []).map(e => ({
                type: "ChangeOwner",
                oldOwner: e.args.oldOwner,
                newOwner: e.args.newOwner,
                blockNumber: e.blockNumber
            })),
            ...(transactionEvents ?? []).map(e => ({
                type: "NewTransaction",
                sender: e.args.sender,
                recipient: e.args.recipient,
                amount: ethers.formatUnits(e.args.amount, 18),
                blockNumber: e.blockNumber
            }))
        ];

        const sortedEvents = allEvents.sort((a, b) =>  b.blockNumber - a.blockNumber).slice(0, 1000);
        setEvents(sortedEvents);
        console.log("Fetched events:", sortedEvents);
    };

    useEffect(() => {
        const initContracts = async () => {
            if (!window.ethereum) {
                console.error("Ethereum provider not found!");
                return;
            }

            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(web3Provider);

            if (!selectedAccount) return;

            try {
                const signer = await web3Provider.getSigner(selectedAccount);
                setSigner(signer);

                const etrContract = new ethers.Contract(TREE_COIN_ADDRESS, treeCoinContract.abi, signer);
                const coinRole = await etrContract.getRoleName();

                const nftContract = new ethers.Contract(TREE_ADDRESS, treeContract.abi, signer);
                const nftRole = await nftContract.getRoleName();

                let etrAdmins: string[] = [];
                let nftAdmins: string[] = [];
                
                if (coinRole !== "user")
                    etrAdmins = await etrContract.getAdmins();

                if (nftRole !== "user")
                    nftAdmins = await nftContract.getAdmins();

                setEtreereumContract(prev => ({
                    ...prev,
                    instance: etrContract,
                    role: coinRole,
                    admins: etrAdmins
                }));

                setNFTreeContract(prev => ({
                    ...prev,
                    instance: nftContract,
                    role: nftRole,
                    admin: nftAdmins
                }));


            } catch (error) {
                console.error("Error initializing contracts:", error);
            }
        };

        initContracts();
    }, [selectedAccount]);

    useEffect(() => {
        if (!etreereumContract.instance) return;

        const fetchBalance = async () => {
            if (!selectedAccount) return;
            try {
                const newBalance = await etreereumContract.instance?.getBalance(selectedAccount);
                const formattedBalance = formatUnits(newBalance, 18);
                setEtreereumContract(prev => ({
                    ...prev,
                    balance: formattedBalance
                }));

            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();

        etreereumContract.instance.on("NewTransaction", () => fetchBalance().then(() => fetchEvent()));


        return () => {
            etreereumContract.instance?.removeAllListeners("NewTransaction");
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAccount, etreereumContract.instance]);

    useEffect(() => {
        if (!nftreeContract.instance) return;

        const fetchBalance = async () => {
            if (!selectedAccount) return;
            try {
                const newBalance = await nftreeContract.instance?.balanceOf(selectedAccount);
                setNFTreeContract(prev => ({
                    ...prev,
                    balance: newBalance.toString()
                }));
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();

        nftreeContract.instance.on("MintTree", () => fetchBalance().then(() => fetchEvent()));
        nftreeContract.instance.on("BurnTree", () => fetchBalance().then(() => fetchEvent()));
        nftreeContract.instance.on("ChangeOwner", () => fetchBalance().then(() => fetchEvent()));

        return () => {
            nftreeContract.instance?.removeAllListeners("MintTree")
                .then(() => nftreeContract.instance?.removeAllListeners("BurnTree"))
                .then(() => nftreeContract.instance?.removeAllListeners("ChangeOwner"))
        };


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAccount, nftreeContract.instance]);


    useEffect(() => {
        if (!etreereumContract.instance || !nftreeContract.instance) return;
        fetchEvent();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [etreereumContract.instance, nftreeContract.instance]);


    return (
        <ContractContext.Provider value={{ provider, signer, etreereumContract, nftreeContract, events }}>
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