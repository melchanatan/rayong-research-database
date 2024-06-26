"use client";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import BlobBackground from "@/components/BlobBackground";
import Navbar from "@/components/Navbar";
import { SessionProvider, getSession } from "next-auth/react";
import { Session } from "next-auth";
import "dotenv/config";
import { TabContextProvider } from "@/utils/TabContextProvider";
import { TopicContextProvider } from "@/utils/TopicContextProvider";

// @ts-expect-error
const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children, session }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black relative min-w-screen overflow-hidden">
          <BlobBackground />
          <TopicContextProvider>
            <SessionProvider session={session}>
              <TabContextProvider>
                <>
                  <Navbar />
                  {children}
                </>
              </TabContextProvider>
            </SessionProvider>
          </TopicContextProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
