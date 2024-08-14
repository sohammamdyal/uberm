import React, { useState, useEffect, useRef } from 'react'
import NET from 'vanta/dist/vanta.net.min'
import { motion } from "framer-motion"
import * as THREE from 'three'

const Hero = () => {
    const container = {
        hidden: { y: '3vw', opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                delayChildren: 2.6,
                staggerChildren: .4
            }
        }
    }

    const icon = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }

    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                THREE: THREE,
                el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xFFFFFF,
                backgroundColor: 0x1E1E21,
                points: 15.00,
                spacing: 17.00,
                showDots: false,
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    return (
        <div 
            ref={myRef} 
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',  // Full screen height
                overflow: 'hidden', // Prevent overflow
            }}
        >
            <div className='relative justify-center text-light-green font-display h-screen w-screen flex flex-col space-y-6 2xl:space-y-12 px-20 2xl:px-64'>
                <motion.h1
                    data-scroll
                    data-scroll-direction='horizontal'
                    data-scroll-speed='-3'
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className='text-6xl md:text-8xl 2xl:text-9xl text-white font-bold'>
                    UBER ORGANIZATION
                </motion.h1>
                <motion.div
                    variants={container}
                    initial={{ x: '-50vw', opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 3, delay: 0.5 } }}
                    className='flex space-x-2 md:-space-x-2 text-xl md:text-2xl 2xl:text-4xl text-white'>
                    <p
                        data-scroll
                        data-scroll-position='top'
                        data-scroll-direction='horizontal'
                        data-scroll-speed='1'>MOVEMENT &nbsp;</p>
                    <p
                        data-scroll
                        data-scroll-position='top'
                        data-scroll-direction='vertical'
                        data-scroll-speed='1'>IS WHAT &nbsp;</p>
                    <p
                        data-scroll
                        data-scroll-position='top'
                        data-scroll-direction='vertical'
                        data-scroll-speed='-1'>WE POWER</p>
                </motion.div>

                <motion.div className='absolute bottom-16 md:bottom-10 right-1/2 md:right-1/3 flex flex-col justify-center space-y-4 overflow-hidden'
                    initial='hidden'
                    animate='visible'
                    variants={container}>
                    <motion.p variants={icon} className='text-sm md:text-md 2xl:text-lg font-display tracking-wider animate-bounce text-white'>Scroll</motion.p>
                    <motion.svg variants={icon} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-green m-auto animate-bounce transition duration-150 hover:text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                    </motion.svg>
                </motion.div>

                {/* Add other elements here */}
            </div>
        </div>
    )
}

export default Hero


