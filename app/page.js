"use client"
import "./../styles/Apps.css"
import GoogleMapSection from './../components/Home/GoogleMapSection'
import SearchSection from './../components/Home/SearchSection'
import { DestinationContext } from './../context/DestinationContext'
import { DirectionDataContext } from './../context/DirectionDataContext' 
import { SourceContext } from './../context/SourceContext'
import { MessagesContext } from "../context/MessagesContext";
import { DriverInfoContext } from '../context/DriverInfoContext'
import { UserButton } from '@clerk/nextjs'
import { LoadScript, useJsApiLoader,GoogleMap } from '@react-google-maps/api'
import Image from 'next/image'
import { useContext, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import DistanceTime from '../components/Home/DistanceTime'
import Intro from '../components/Home/Intro'
import FeedBack from './../components/FeedBack';
import Messages from './../components/message';
import { MessagesProvider } from './../context/MessagesContext';
import Chat from './../components/Chat';
import ReactMapGL from 'react-map-gl';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import AnimCursor from './../components/AnimCoursor'
import smoothScroll from './../components/smoothScroll/index'
import './../styles/locomotive-scroll.css'
const Map = dynamic(() => import('./../components/Home/GoogleMapSection'), { ssr: false });
export default function Home() {
  const [source,setSource]=useState([])
  const [destination,setDestination]=useState([])
  const [directionData,setDirectionData] = useState([]);
const [viewport, setViewport] = useState({
  width:400,
  height:400,
  latitude:37.7577,
  longitude:-122.4376,
  zoom:8
});
  
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  // })


  


  return (
   
    <SourceContext.Provider value={{source,setSource}}>
      <DestinationContext.Provider value={{destination,setDestination}}>
        <DirectionDataContext.Provider value={{directionData,setDirectionData}} >
       
        
        <AnimCursor/>
    
   <smoothScroll/>
     
        
        
 
       <LoadScript 
      libraries={['places']}
       googleMapsApiKey="AIzaSyC3mZg6P7r2AzeOdm4XiQTmHora9Zs3fGQ"
      > 
      <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div>
            <SearchSection/>
            
        </div>
        <div className='col-span-2'>
            <Map/>
            
          
            
          
          </div>
          <Chat/>
          
      </div>
      <Intro />

      </LoadScript>
     
      
     
      </DirectionDataContext.Provider>
      </DestinationContext.Provider>
      <UserButton />
    </SourceContext.Provider>
    
  )
}
