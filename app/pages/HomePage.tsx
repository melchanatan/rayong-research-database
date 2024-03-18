"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { IoSearch } from "react-icons/io5";
import BlobBackground from "@/components/BlobBackground";
import ParticleComponent from "@/components/ParticleComponent";
const HomePage: React.FC = () => {
  const topics = [
    {
      name: "Topic 1",
      x: 100,
      y: 100,
    },
    {
      name: "Topic 2",
      x: 200,
      y: 0,
    },
    {
      name: "Topic 2",
      x: 500,
      y: 400,
    },
  ];
  const dragCoefficent = 0.9;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/topic");
  };

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

  const maxDistanceFromCenter = Math.sqrt(
    window.innerWidth ** 2 + window.innerHeight ** 2
  );

  const handleMouseMove = (event) => {
    if (isDragging) {
      const x = event.clientX - startPosition.x;
      const y = event.clientY - startPosition.y;
      setPosition({ x, y });
      console.log(x, y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center absolute "
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="w-screen h-screen absolute "
        style={{
          top: position.y * dragCoefficent,
          left: position.x * dragCoefficent,
        }}
      >
        {topics.map((topic, index) => {
          const distanceFromCenter =
            maxDistanceFromCenter -
            Math.sqrt(
              Math.pow(window.innerWidth / 2 - (position.x + topic.x), 2) +
                Math.pow(window.innerHeight / 2 - (position.y + topic.y), 2)
            );

          const scale = Math.min(distanceFromCenter / 700, 2.5);

          const randomPosY = Math.random() * 50;
          const randomPosX = Math.random() * 50;
          return (
            <FloatingButton
              key={"topic" + index}
              handleClick={handleClick}
              content={topic.name}
              top={topic.y + randomPosY}
              left={topic.x + randomPosX}
              scale={scale}
            />
          );
        })}
      </div>

      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full">
        <ParticleComponent className="w-full h-full absolute" />
      </div>

      <div
        className="translate-y-[-50px] flex flex-col align-middle text-center "
        draggable="false"
      >
        <h1 className="select-none">ฐานข้อมูลระยอง</h1>
        <p className="mb-5 paragraph select-none">
          แหล่งรวบรวมข้อมูลจังหวัดระยอง
        </p>
        <span className=" px-3 py-2 rounded-full flex items-center gap-2 glassmorphism !border-gray-500">
          <IoSearch className="fill-gray-500" />
          <input
            type="text"
            placeholder={"Search"}
            className="placeholder:text-gray-500 placeholder:select-none focus:outline-none bg-transparent paragraph"
          />
        </span>
      </div>
    </div>
  );
};

export default HomePage;

const FloatingButton = ({ content, handleClick, top, left, scale }) => {
  return (
    <a
      onClick={handleClick}
      draggable="false"
      style={{
        transform: `scale(${scale})`,
        top: top,
        left: left,
      }}
      className={`select-none absolute bg-red-500 hover:scale-110 transition-all duration-300 topic-tag`}
    >
      {content}
    </a>
  );
};
