"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { IoSearch } from "react-icons/io5";
import BlobBackground from "@/components/BlobBackground";
import ParticleComponent from "@/components/ParticleComponent";
import Searchbar from "@/components/Searchbar";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Joystick } from "react-joystick-component";
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

  const handleJoystickDir = (e) => {
    console.log(e);
  };

  const handleMove = (e) => {
    const { x, y } = e;
    const oldX = position.x;
    const oldY = position.y;
    const newX = oldX + x * 2;
    const newY = oldY - y * 2;
    setPosition({ x: newX, y: newY });
    console.log(x, y);
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
      <div className="absolute bottom-[10vh] right-[10vw] [&>*]:opacity-55">
        <Joystick
          size={120}
          baseColor="rgba(150, 150, 150, 0.3)"
          stickColor="rgba(150, 150, 150, 0.3)"
          move={handleMove}
          // stop={handleStop}
        ></Joystick>
        {/* <ReactNipple
          className="joystick is-relative"
          options={{
            mode: "static",
            color: "hsl(219, 84%, 56%)",
            position: { top: "50%", left: "50%" },
            size: 150,
            treshold: 0.1,
          }}
          style={{
            width: 250,
            height: 250,
          }}
          onDir={handleJoystickDir}
        /> */}
        {/* <Joystick /> */}
      </div>
    </>
  );
};

export default HomePage;
