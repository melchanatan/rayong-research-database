"use client";
import { useRouter } from "next/navigation";
import React from "react";
const Navbar = () => {
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
      <a className="button-outline" onClick={goToLoginPage}>
        Login
      </a>
    </nav>
  );
};

export default Navbar;
