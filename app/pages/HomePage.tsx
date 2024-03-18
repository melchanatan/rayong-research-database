"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { IoSearch } from "react-icons/io5";
import BlobBackground from "@/components/BlobBackground";
import ParticleComponent from "@/components/ParticleComponent";
import Searchbar from "@/components/Searchbar";
import InfiniteScroll from "@/components/InfiniteScroll";
import { TopicContextProvider } from "@/utils/TopicContextProvider";
const HomePage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const x = event.clientX - startPosition.x;
      const y = event.clientY - startPosition.y;
      setPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <TopicContextProvider>
      <div
        className="w-screen h-screen flex flex-col justify-center items-center absolute "
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <InfiniteScroll position={position}></InfiniteScroll>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full">
          {/* <ParticleComponent className="w-full h-full absolute" /> */}
        </div>
        <div
          className="translate-y-[-50px] flex flex-col align-middle text-center "
          draggable="false"
        >
          <h1 className="select-none">ฐานข้อมูลระยอง</h1>
          <p className="mb-5 paragraph select-none">
            แหล่งรวบรวมข้อมูลจังหวัดระยอง
          </p>
          <Searchbar></Searchbar>
        </div>
      </div>
    </TopicContextProvider>
  );
};

export default HomePage;
