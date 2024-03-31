"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import blob1 from "./assets/blob-1.svg";
import test from "/public/next.svg";
// import blob2 from "../assets/blob-blue-2.svg";
// import blob3 from "../assets/blob-blue-3.svg";

const BlobBackground: React.FC = () => {
  const blueGradient: string =
    "radial-gradient(circle, rgba(43,170,217,1) 0%, rgba(13,84,149,1) 68%)";
  const greenGradient: string =
    "radial-gradient(circle, rgba(121,170,62,1) 0%, rgba(4,251,58,0.36299765807962525) 100%)";

  const [blobs, setBlobs] = useState([
    {
      x: -100,
      y: -200,
      src: "/blob-1.svg",
      px: "top",
      py: "left",
    },
    {
      x: 0,
      y: 0,
      src: "/blob-2.svg",
      px: "top",
      py: "right",
    },
    {
      x: 200,
      y: -200,
      src: "/blob-3.svg",

      px: "top",
      py: "right",
    },
    {
      x: 200,
      y: -200,
      src: "/blob-1.svg",
      px: "bottom",
      py: "right",
    },
    {
      x: 100,
      y: 20,
      src: "/blob-3.svg",
      px: "bottom",
      py: "left",
    },
    {
      x: 100,
      y: 20,
      src: "/blob-2.svg",
      px: "",
      py: "left",
    },
  ]);

  function moveBlob() {
    //randomly move blob
    blobs.forEach((blob, index) => {
      setBlobs((prevBlobs) => {
        const newBlobs = [...prevBlobs];
        newBlobs[index].x = Math.floor(Math.random() * 200);
        newBlobs[index].y = Math.floor(Math.random() * 200);
        return newBlobs;
      });
    });
  }

  useEffect(() => {
    if (window!.innerWidth < 768) {
      return;
    }
    var interval = setInterval(moveBlob, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen">
      {blobs.map((blob, index) => {
        const { x, y, px, py, src } = blob;
        const customStyle = {
          top: px === "top" ? `${y}px` : "auto",
          bottom: px === "bottom" ? `${y}px` : "auto",
          left: py === "left" ? `${x}px` : "auto",
          right: py === "right" ? `${x}px` : "auto",
        };
        return (
          <Image
            className={`rounded-full absolute opacity-50 transition-all duration-[3000ms]`}
            src={src}
            alt="Vercel Logo"
            width={600}
            height={600}
            key={"blob" + index}
            style={customStyle}
            priority
          />
        );
      })}
    </div>
  );
};

export default BlobBackground;
