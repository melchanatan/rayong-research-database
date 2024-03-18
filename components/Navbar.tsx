"use client";
import { useRouter } from "next/navigation";
import React from "react";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const goToLoginPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/publish");
  };

  return (
    <nav className="absolute top-0 flex w-screen p-3 z-10 justify-between items-center select-none">
      {/* logo */}

      <a href="/">
        <div className="w-6 h-6 bg-white"></div>
      </a>
      {session ? (
        <div>Welcome, {session.user!.name}!</div>
      ) : (
        <div>You are not logged in.</div>
      )}
      <LoginButton />
    </nav>
  );
};

export default Navbar;
