"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { IoSearch } from "react-icons/io5";
import BlobBackground from "@/components/BlobBackground";
import ParticleComponent from "@/components/ParticleComponent";
const HomePage: React.FC = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/topic");
  };

  return (
    <>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full">
        <ParticleComponent className="w-full h-full absolute" />
      </div>
      <a
        onClick={handleClick}
        className="top-[100px] left-[400px] absolute bg-red-500 hover:scale-110 transition-all duration-300 topic-tag"
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
    </>
  );
};

export default HomePage;
