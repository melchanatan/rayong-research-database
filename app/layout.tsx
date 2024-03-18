"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import BlobBackground from "@/components/BlobBackground";
import Navbar from "@/components/Navbar";
import { SessionProvider, getSession } from "next-auth/react";
import { Session } from "next-auth";
import "dotenv/config";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | undefined;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black relative min-w-screen overflow-hidden">
          <SessionProvider session={session}>
            <Navbar />
            <BlobBackground />
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
