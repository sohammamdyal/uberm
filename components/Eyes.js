"use client"; // This is necessary for client-side hooks in Next.js 13

import Image from "next/image";
import eyes from "./../public/eyes.svg"; // Adjust the import according to your image path
import React, { useEffect, useState } from "react";

export default function Eyes({ className }) {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - window.innerWidth / 2;
      const deltaY = mouseY - window.innerHeight / 2;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 280);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full gap-[30px] flex items-center justify-center">
      <div 
        className={`bg-white border-[2px] border-[#21212188] rounded-full flex items-center justify-center ${className}`}>
        <Image
          style={{
            transform: `rotate(${rotate}deg)`,
          }}
          src={eyes}
          alt="Eyes"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`bg-white border-[2px] border-[#21212188] rounded-full flex items-center justify-center ${className}`}>
        <Image
          style={{
            transform: `rotate(${rotate}deg)`,
          }}
          src={eyes}
          alt="Eyes"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
