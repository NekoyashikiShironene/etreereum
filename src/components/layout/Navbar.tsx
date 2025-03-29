'use client';

import React from 'react'
import WalletButton from '../WalletButton'
import Link from 'next/link'
import { useContract } from '@/contexts/ContractContext';

export default function Navbar() {
  const { etreereumContract } = useContract();

  return (
    <nav className="fixed z-10 top-0 w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">

      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-green-600">WebTree</h1>
      </div>

      <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</Link>
        <Link href="/ecowallet" className="text-gray-700 hover:text-green-600 transition-colors">EcoWallet</Link>
        <Link href="/gallery" className="text-gray-700 hover:text-green-600 transition-colors">Gallery</Link>
        {
          etreereumContract.role !== "user" ?
            <Link href="/management" className="text-gray-700 hover:text-green-600 transition-colors">Management</Link>
            : <Link href="/request" className="text-gray-700 hover:text-green-600 transition-colors">Request</Link>
        }

        <Link href="/redeem" className="text-gray-700 hover:text-green-600 transition-colors">Redeem</Link>
      </div>

      <div className="flex items-center">
        <WalletButton />
      </div>

    </nav>

  )
}
