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
    <nav className="absolute top-0 right-0 p-3 z-10 justify-between items-center select-none">
      {session ? <Menu session={session} /> : <LoginButton />}
    </nav>
  );
};

export default Navbar;

const Menu = () => {
  const { data: session } = useSession();
  if (!session) return <div>Something went wrong</div>;
  if (!session.usernameExists)
    return (
      <div className="gap-2 flex items-center">
        User unauthorized <LoginButton />
      </div>
    );

  return (
    <div className="glassmorphism bg-white p-3 rounded-lg shadow-lg flex flex-row justify-between gap-2 items-center">
      <div className="flex flex-row  ">
        <a href="/" className="link-button">
          Home
        </a>
        <a href="/admin/publish/new" className="link-button">
          Publish
        </a>
        <a href="/admin/dashboard" className="link-button">
          Dashboard
        </a>
      </div>
      {/* <img
        src={session.user!.image}
        alt="user profile"
        className="h-8 w-8 rounded-full"
      /> */}
      <LoginButton />
    </div>
  );
};
