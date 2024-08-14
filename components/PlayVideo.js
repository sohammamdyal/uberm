// components/PlayVideo.js
"use client";
import Image from "next/image";
import eyes from './../public/eyes.svg'
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function PlayVideo({ videosrc }) {
  const [rotate, setRotate] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const mq = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <div
      className="w-full relative overflow-hidden cursor-pointer -mt-4"
      ref={container}
      onClick={togglePlay}>
      <div
        className="w-full h-full"
        data-scroll
        data-scroll-speed="-.8"
        data-scroll-section>
        <video
          className="w-full h-full mb-10"
          loop
          ref={videoRef}
          src={videosrc}
        />
        <motion.div
          className={`w-full absolute top-[50%] transform translate-y-[-50%] gap-[30px] flex items-center justify-center ${
            isPlaying && "hidden"
          }`}
          style={{ y: mq }}>
          <div
            className="w-[200px] h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[100px] xm:h-[100px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={togglePlay}>
            <div className="relative w-full h-full">
              <Image
                style={{
                  transform: `rotate(${rotate}deg)`,
                }}
                src={eyes}
                alt="img"
                className="w-full h-full object-cover"
              />
              <p className="absolute top-1/2 left-1/2 paragraph uppercase text-white font-NeueMontreal font-medium transform translate-x-[-50%] translate-y-[-50%]">
                {isPlaying ? "Pause" : "Play"}
              </p>
            </div>
          </div>
          <div
            className="w-[200px] sm:w-[150px] sm:h-[150px] xm:w-[100px] xm:h-[100px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={togglePlay}>
            <div className="relative w-full h-full">
              <Image
                style={{
                  transform: `rotate(${rotate}deg)`,
                }}
                src={eyes}
                alt="img"
                className="w-full h-full object-cover"
              />
              <p className="absolute top-1/2 left-1/2 paragraph uppercase text-white font-NeueMontreal font-medium transform translate-x-[-50%] translate-y-[-50%]">
                {isPlaying ? "Pause" : "Play"}
              </p>
            </div>
          </div>
        </motion.div>
        <div
          onClick={togglePlay}
          className={`w-full absolute top-[50%] transform translate-y-[-50%] gap-[30px] flex items-center justify-center ${
            !isPlaying && "hidden"
          }`}>
          <button className="text-white text-[18px] bg-black px-[10px] leading-none font-normal py-[5px] font-NeueMontreal rounded-[20px]">
            pause
          </button>
        </div>
      </div>
    </div>
  );
}
