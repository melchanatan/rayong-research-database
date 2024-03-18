"use client";

import Image from "next/image";
import HomePage from "./HomePage";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return <HomePage />;
}
