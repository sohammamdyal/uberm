"use client";
import React from 'react';
import Lottie from 'lottie-react';
import bannerImage from './../../../public/mapv.json';
import { SignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { RiAdminFill } from "react-icons/ri";

function App() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/AdminSignin');
  };

  return (
    <div>
      <Lottie 
        animationData={bannerImage} 
        width={900} 
        height={1000}
        className="object-contain h-full w-full" 
      />
      <div className="absolute top-20 right-0">
        <SignIn />
      </div>
      <div className="absolute top-20 left-0 flex flex-col space-y-4 p-4">
        <button 
          onClick={handleRedirect} 
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition"
        style={{width:200,height:200,fontSize:35}}>
          <RiAdminFill className="inline-block mr-3 text-5xl" />
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default App;
