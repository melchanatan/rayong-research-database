"use client";

import Image from "next/image";
import HomePage from "./HomePage";
import { SessionProvider } from "next-auth/react";
import { Suspense, useContext, useEffect } from "react";
import { TopicContext } from "@/utils/TopicContextProvider";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
