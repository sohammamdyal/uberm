"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import InputItem from "./InputItem";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import CarListOptions from "./CarListOptions";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const calculateDistance = (source, destination) => {
  const from = turf.point([source.lng, source.lat]);
  const to = turf.point([destination.lng, destination.lat]);
  const options = { units: "miles" };
  const distance = turf.distance(from, to, options);
  return distance.toFixed(2);
};

function SearchSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [distance, setDistance] = useState(null);



  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);




  const handleSearch = () => {
    if (source && destination) {
      const dist = calculateDistance(source, destination);
      setDistance(dist);
    }
  };

  const container = (delay) => ({
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: delay } },
  });

  return (
    <div>
      <div className='p-2 md:p-6 border-[2px] rounded-xl' data-aos="fade-right">
        <p
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='text-[20px] font-bold'
        >
          Go anywhere with Uber
        </p>
        <InputItem type='source' />
        <InputItem type='destination' />

        {/* <button
          className='p-4 bg-black w-full mt-5 text-white rounded-lg hover:bg-white hover:text-black border hover:border-black ease-in-out duration-300'
          onClick={handleSearch}
        >
          Search
        </button> */}
        <button class="text-red w-full hover:before:bg-redborder-red-500 relative h-[50px] mt-8 overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white 
        hover:shadow-black hover:before:left-0 hover:before:w-full" onClick={handleSearch}><span class="relative z-10">Search</span></button>
      </div>

      {distance ? <CarListOptions distance={distance} /> : null}

    </div>
  );
}

export default SearchSection;
