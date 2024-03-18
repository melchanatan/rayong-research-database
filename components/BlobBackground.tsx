"use client";
import React, { useEffect, useState } from "react";

const BlobBackground: React.FC = () => {
  const blueGradient: string =
    "radial-gradient(circle, rgba(43,170,217,1) 0%, rgba(13,84,149,1) 68%)";
  const greenGradient: string =
    "radial-gradient(circle, rgba(121,170,62,1) 0%, rgba(4,251,58,0.36299765807962525) 100%)";

  const [blobs, setBlobs] = useState([
    {
      x: -100,
      y: -200,
      color: blueGradient,
      px: "top",
      py: "left",
      width: 20,
      height: 20,
      blur: 140,
    },
    {
      x: 0,
      y: 0,
      color: greenGradient,
      px: "top",
      py: "right",
      width: 10,
      height: 20,
      blur: 120,
    },
    {
      x: 200,
      y: -200,
      color: blueGradient,
      px: "top",
      py: "right",
      width: 10,
      height: 20,
      blur: 130,
    },
    {
      x: 100,
      y: 20,
      color: blueGradient,
      px: "bottom",
      py: "right",
      width: 20,
      height: 20,
      blur: 250,
    },
    {
      x: 100,
      y: 20,
      color: blueGradient,
      px: "bottom",
      py: "left",
      width: 10,
      height: 20,
      blur: 170,
    },
    {
      x: 100,
      y: 20,
      color: greenGradient,
      px: "",
      py: "left",
      width: 10,
      height: 20,
      blur: 170,
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
    var interval = setInterval(moveBlob, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {blobs.map((blob, index) => {
        const { x, y, color, px, py, width, height, blur } = blob;
        const customStyle = {
          top: px === "top" ? `${y}px` : "auto",
          bottom: px === "bottom" ? `${y}px` : "auto",
          left: py === "left" ? `${x}px` : "auto",
          right: py === "right" ? `${x}px` : "auto",
          width: `${width}rem`,
          height: `${height}rem`,
          background: `${color}`,
          filter: `blur(${blur}px)`,
          WebkitFilter: `blur(${blur}px)`,
          MozFilter: `blur(${blur}px)`,
          msFilter: `${blur}px`,
        };
        return (
          <svg
            key={"blob" + index}
            className={`rounded-full absolute opacity-50 transition-all duration-[3000ms]`}
            style={customStyle}
          ></svg>
        );
      })}
    </>
  );
};

export default BlobBackground;
