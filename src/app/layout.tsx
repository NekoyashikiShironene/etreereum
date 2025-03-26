import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import WalletProvider from "@/contexts/WalletContext";
import { ContractProvider } from "@/contexts/ContractContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebTree",
  description: "Let's plant a tree!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <ContractProvider>
            <Navbar />
            <main className="p-6 sm:p-10">{children}</main>
          </ContractProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
