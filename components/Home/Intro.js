import React, { useEffect, useState, useRef  } from 'react'
import styles from './../../app/styles/Intro.module.css'
import Image from 'next/image';
import uberBll from './../../public/make.jpg'
import money from './../../public/money.jpg'
import mapv from './../../public/mapv.json';
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Lottie from 'lottie-react';
// import { motion } from 'framer-motion';
import AOS from 'aos';
import "aos/dist/aos.css";
import Globe from './../globe'
import CountUP from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import Lenis from 'lenis';
import { useScroll, useTransform, motion } from 'framer-motion';
import Picture1 from '../../public/heal2.jpg'
import Picture2 from '../../public/heal2.jpg'
import Picture3 from '../../public/heal2.jpg'
import SlidingImages from './../../components/SlidingImages/index';
// import ScrollSection from './../../components/ScrollSection'
import PlayVideo from './../PlayVideo';
import AboutIn from './AboutIn';
import Marquee from "./../Marquee";
import './../../styles/Glob.css'
import './../../styles/Marquee.css';
import mar1 from './../../public/m1.png';
import mar2 from './../../public/m2.png';
import mar3 from './../../public/m3.png';
import mar4 from './../../public/m4.png';
import mar5 from './../../public/m5.png';
import mar6 from './../../public/m7.png';
import mar7 from './../../public/m6.png';

import RoundButton from './../RoundButton';
	

export default function Intro() {
	const [counterOn, setCounterOn] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [hovered, setHovered] = useState(false);
	useEffect(() => {
		AOS.init({ duration: 2000 });
	}, []);
	useEffect( () => {
		(
		  async () => {
			  const LocomotiveScroll = (await import('locomotive-scroll')).default
			  const locomotiveScroll = new LocomotiveScroll();
	
			  setTimeout( () => {
				setIsLoading(false);
				document.body.style.cursor = 'default'
				window.scrollTo(0,0);
			  }, 2000)
		  }
		)()
	  }, [])
	const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  })

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
	return (

		<div>
			
			<div className='px-40 py-12 ' >
				<ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
					<div className='grid grid-cols-4 text-center pt-50'>

						<div className='bg-[#2a000e] py-8 mr-10 rounded-lg'>

							<h2 className='text-4xl font-bold text-[#FFF]'>
								{counterOn && <CountUP start={0} end={95}>

								</CountUP>}+</h2>
							<p className='py-2 text-[#FFF] font-medium'>Accurate Approching</p>
						</div>
						<div className='bg-[#2a000e] py-8 mr-10 rounded-lg'>
							<h2 className='text-4xl font-bold text-[#FFF]'>{counterOn && <CountUP start={0} end={95}>

							</CountUP>}+</h2>
							<p className='py-2 text-[#FFF] font-medium'>Best service</p></div>
						<div className='bg-[#2a000e] py-8 mr-10 rounded-lg'>
							<h2 className='text-4xl font-bold text-[#FFF]'>{counterOn && <CountUP start={0} end={150}>
 
							</CountUP>}+</h2>
							<p className='py-2 text-[#FFF] font-medium'>trained Driver</p></div>
						<div className='bg-[#2a000e] py-8 mr-10 rounded-lg'>
							<h2 className='text-4xl font-bold text-[#FFF]'>{counterOn && <CountUP start={0} end={19}>

							</CountUP>} K+</h2>
							<p className='py-2 text-[#FFF] font-medium'>Approved</p></div>

					</div>
				</ScrollTrigger>
			</div>

{/* marque */}
			<section className="w-full bg-[#004d3a] h-100 rounded-t-[20px]">
    <div className="w-full bg-[#004d3a] z-10 relative rounded-t-[20px] py-8">
        <Marquee
            title="Uber services"
            className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[25px] xm:pb-[18px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
        />
    </div>
	
	</section>
	<AboutIn/>
	{/* marque */}
			{/* horizontal scroll */}
			{/* <main className="overflow-hidden">
      <div className='h-[100vh]'/>
      <div ref={container}>
        <Slide src={Picture1} direction={'left'} left={"-40%"} progress={scrollYProgress}/>
        <Slide src={Picture2} direction={'right'} left={"-25%"} progress={scrollYProgress}/>
        <Slide src={Picture3} direction={'left'}  left={"-75%"} progress={scrollYProgress}/>
      </div>
      <div className='h-[100vh]' />
    </main> */}
	<PlayVideo videosrc="/homevideo.mp4" />

				{/* horizontal scroll end */}
				

			<div style={{ backgroundColor: "#000", }}>
				{/* <div className={styles.container}>
					<div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 1 }} className={styles.imageContainer}>
						<Image src={uberBll} alt="Drive with Uber" style={{
							maxWidth: 400,
							height: "auto", borderRadius: 10
						}} data-aos="fade-right" />
					</div>

					<div className={styles.textContainer} >
						<h1 data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 1, delay: 1 }}>Drive when you want, make what you need</h1>

						<p data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 1, delay: 1.2 }}>
							Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.
						</p>
						<button data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 1, delay: 1.4 }} className={styles.getStarted}>Get started  <FaArrowRight className={styles.arrow} /></button>
						<p data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 1, delay: 1.5 }}>
							Already have an account? <a href="/sign-up">Sign in</a>
						</p>
					</div>
				</div> */}
				
				<div style={{ backgroundColor: "#FFF" }}>
					<div className={styles.containers}>
						<div className={styles.textContainers}>
							<h1 data-aos="fade-right" initial={{ x: -100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.5, delay: 1.6 }}>Make money by renting out your car</h1>
							<p data-aos="fade-right" initial={{ x: -100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.5, delay: 1.9 }}>
								Connect with thousands of drivers and earn more per week with Uber’s free fleet management tools.
							</p>
							<div data-aos="fade-right" className={styles.buttons}>
							<div
      className="flex items-center justify-between bg-black cursor-pointer rounded-full group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.9 }}>
      <RoundButton
        href="/ochi-team"
        title="read more"
        bgcolor="#000"
        className="bg-white text-black"
        style={{ color: "#fff" }}
      />
    </div>
							</div>
						</div>
						<div initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 1, delay: 2.5 }} className={styles.imageContainers}>

							<Image data-aos="fade-left" src={money} alt="The Uber you know, reimagined for business" style={{
								maxWidth: 400,
								height: "auto", borderRadius: 10,
								marginTop: "70px"
							}} />
						</div>
					</div>
					{/* <main className={styles.main}>
				<SlidingImages />
				</main> */}

				{/* marqueee logo start */}
				<div className="marquee">
      <div className="marquee-inner">
        <Image src={mar1} alt="Logo 1" />
        <Image src={mar2} alt="Logo 2" />
        <Image src={mar3} alt="Logo 3" />
        <Image src={mar4} alt="Logo 4" />
        <Image src={mar5} alt="Logo 5" />
        <Image src={mar6} alt="Logo 6" />
        <Image src={mar7} alt="Logo 7" />
        {/* Add more logos as needed */}
      </div>
    </div>
				{/* marqueee logo end */}
				</div>
				

				<div className=" h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">

					<div className="p-5 " data-aos="fade-right">
						<ul>
							<p className="text-white font-bold text-3xl pb-6">
								<span className="text-white">Uber</span>
							</p>
							<div className="flex gap-6 pb-5">
								<FaInstagram className="text-2xl cursor-pointer text-white hover:text-yellow-600" />
								<FaTwitter className="text-2xl cursor-pointer text-white hover:text-blue-600" />
								<FaLinkedin className="text-2xl cursor-pointer text-white hover:text-blue-600" />
								<FaYoutube className="text-2xl cursor-pointer text-white hover:text-red-600" />
							</div>
						</ul>
					</div>
					<div className="p-5" data-aos="fade-up">
						<ul>
							<p className="text-white font-bold text-2xl pb-4" >Product</p>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Stocks
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Futures & Options
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Mutual Funds
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Fixed deposits
							</li>
						</ul>
					</div>
					<div className="p-5" data-aos="fade-up">
						<ul>
							<p className="text-white font-bold text-2xl pb-4">Company</p>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								About
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Products
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Pricing
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Careers
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Press & Media
							</li>
						</ul>
					</div>
					<div className="p-5" data-aos="fade-up">
						<ul>
							<p className="text-white font-bold text-2xl pb-4">Support</p>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Contact
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Support Portals
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								List Of Charges
							</li> 	
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Downloads & Resources
							</li>
							<li className="text-white text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
								Videos
							</li>
						</ul>
					</div>
				</div>

			</div>
		
			{/* <ScrollSection/> */}
			

			
		</div>
	

		


	)
}

// const Slide = (props) => {
// 	const direction = props.direction == 'left' ? -1 : 1;
// 	const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction])
// 	return (
// 	  <motion.div style={{x: translateX, left: props.left}} className="relative flex whitespace-nowrap">
// 		<Phrase src={props.src}/>
// 		<Phrase src={props.src}/>
// 		<Phrase src={props.src}/>
// 	  </motion.div>
// 	)
//   }
  
//   const Phrase = ({src}) => {
  
// 	return (
// 	  <div className={'px-5 flex gap-5 items-center'}>
// 		<p className='text-[7.5vw]'>Front End Developer</p>
// 		<span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
// 		  <Image style={{objectFit: "cover"}} src={src} alt="image" fill/>
// 		</span>
// 	  </div>
// 	)
//   }
