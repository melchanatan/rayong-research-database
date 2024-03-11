"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { IoSearch } from "react-icons/io5";
import BlobBackground from "../components/BlobBackground";
const HomePage: React.FC = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/topic/1");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black relative min-w-screen overflow-hidden">
      <BlobBackground />
      <a
        onClick={handleClick}
        className="top-[100px] left-[400px] absolute px-6 p-1 bg-red-500 text-white rounded-full paragraph hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        Topic 1
      </a>
      <div className="translate-y-[-50px] flex flex-col align-middle text-center">
        <h1 className="">ฐานข้อมูลระยอง</h1>
        <p className="mb-5 paragraph">แหล่งรวบรวมข้อมูลจังหวัดระยอง</p>
        <span className=" px-3 py-2 rounded-full flex items-center gap-2 glassmorphism !border-gray-500">
          <IoSearch className="fill-gray-500" />
          <input
            type="text"
            placeholder={"Search"}
            className="placeholder:text-gray-500 focus:outline-none bg-transparent paragraph"
          />
        </span>
      </div>
    </main>
  );
};

export default HomePage;
