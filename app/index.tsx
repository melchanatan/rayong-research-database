"use client";

import Image from "next/image";
import HomePage from "./HomePage";
import { SessionProvider } from "next-auth/react";
import { useContext, useEffect } from "react";
import { TopicContext } from "@/utils/TopicContextProvider";

export default function Home() {
  return <HomePage />;
}
