"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import anime from 'animejs'
import logoBg from './../public/download.gif'

const SplashScreen = ({ finishLoading }) => {
    const [isMounted, setIsMounted] = useState(false)

    const animate = () => {
        const loader = anime.timeline({
            complete : () => finishLoading(),
        })
        loader.add({
                targets:"#logo",
                delay:0,
                scale:1,
                duration:500,
                easing:"easeInOutExpo",
        })
        .add({
            targets:"#logo",
            delay:0,
            scale:1.25,
            duration:500,
            easing:"easeInOutExpo",
    })
    .add({
        targets:"#logo",
        delay:0,
        scale:1,
        duration:500,
        easing:"easeInOutExpo",
})
.add({
    targets:"#logo",
    delay:0,
    scale:1.25,
    duration:500,
    easing:"easeInOutExpo",
})
    }

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10)
        animate()
        return () => clearTimeout(timeout)
    }, [])
  return <div className='flex h-screen items-center justify-center' isMounted={isMounted}>
    <Image id="logo" src={logoBg} alt="" width={500} height={500} />
  </div>

 
}

export default SplashScreen