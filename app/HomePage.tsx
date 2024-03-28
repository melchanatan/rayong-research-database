"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { IoSearch } from "react-icons/io5";
import BlobBackground from "@/components/BlobBackground";
import ParticleComponent from "@/components/ParticleComponent";
import Searchbar from "@/components/Searchbar";
import InfiniteScroll from "@/components/InfiniteScroll";
import {
  TopicContext,
  TopicContextProvider,
} from "@/utils/TopicContextProvider";

const HomePage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const { isLoading } = useContext(TopicContext);

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
    <>
      {!isLoading ? (
        <div
          className="w-screen h-screen flex flex-col justify-center items-center absolute "
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <InfiniteScroll position={position}></InfiniteScroll>

          <div
            onDragStart={function (event) {
              event.preventDefault();
            }}
            className="translate-y-[-50px] flex flex-col align-middle text-center z-10"
            draggable="false"
          >
            <h1 className="select-none">ฐานข้อมูลระยอง</h1>
            <p className="mb-5 paragraph select-none">
              แหล่งรวบรวมข้อมูลจังหวัดระยอง
            </p>
            <Searchbar></Searchbar>
          </div>
        </div>
      ) : (
        <h1 className="animate-pulse">Loading...</h1>
      )}
    </>
  );
};

export default HomePage;
