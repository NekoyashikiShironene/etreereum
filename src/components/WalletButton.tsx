"use client";
import { useContract } from "@/contexts/ContractContext";
import { useWallet } from "@/contexts/WalletContext";

export default function WalletButton() {
    const { accounts, selectedAccount, connectWallet, selectAccount } = useWallet();
    const { etreereumContract } = useContract();
    const { balance } = etreereumContract;
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={connectWallet}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                {selectedAccount ? `Connected: ${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)} (${balance} ETR)` : "Connect Wallet"}
            </button>

            {accounts.length > 1 && (
                <select
                    value={selectedAccount}
                    onChange={(e) => selectAccount(e.target.value)}
                    className="border p-2 rounded-lg w-[4rem]"
                >
                    {accounts.map((account) => (
                        <option key={account} value={account}>
                            {account.slice(0, 6)}...{account.slice(-4)}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

