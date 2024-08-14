"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import styles from './../../app/styles/Home.module.css';
import style from './../../app/styles/Conform.module.css';
import styless from './../../app/styles/page.module.css';
import background from './../../public/uberbanner.jpeg';
import rid from './../../public/car.png';
import whe from './../../public/steering-wheel.png';
import cut from './../../public/cutlery.png';
import win from './../../public/glass-and-bottle-of-wine.png';
import bik from './../../public/bicycle.png';
import bus from './../../public/briefcase.png';
import tru from './../../public/cargo-truck.png';
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';
import PreloaderContact from './../../components/PreloaderContact';
import dynamic from 'next/dynamic';
import SmoothScroll from './../../components/smoothScroll/index';
import Projects from './../../components/projects';
// import Socials from '../../components/contactPage/Social';
import Link from "next/link";
// import Image from "next/image";
import eyes from './../../public/eyes.svg'
import { ArrowUpRight } from "lucide-react";
import LinkHover from "./../../components/animation/LinkHover";
import TextMask from './../../components/animation/TextMask';
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Eyes from "./../../components/Eyes";
import contactHero from "./../../public/contacthhero.jpg";
import AnimCursor from './../../components/AnimCoursor';
import './../../styles/Glob.css'
const Earth = dynamic(() => import('./../../components/earth/index'), {
  ssr: false,
  loading: () => <Image src="/assets/placeholder.png" width={500} height={300}></Image>
})

const page = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState(null);
	const [rotate, setRotate] = useState(0);
	const phrase = ["microsoft", "github", "facebook", "linkedin"];
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});

	const mq = useTransform(scrollYProgress, [0, 1], [0, -700]);
	useEffect(()=>{
		AOS.init({duration:2000});
	},[]);

	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			let mouseX = e.clientX;
			let mouseY = e.clientY;

			let deltaX = mouseX - window.innerWidth / 2;
			let deltaY = mouseY - window.innerHeight / 2;

			var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
			setRotate(angle - 280);
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/api/form/contact", {
				method: "POST",

				headers: {
					"Content-Type": "application/json",

				},
				body: JSON.stringify({
					username,
					email,
					message
				}),
			});
			if (response.ok) {
				setUsername('');
				setEmail('');
				setMessage('');
				const data = await response.json();
				console.log(data);
				alert('message send successfully');
			}
		} catch (error) {
			alert("message not send");
			console.log(error);
		}

	};
	
	
	
	return (
		<div>
			<AnimCursor/>
			<PreloaderContact/>
			{/* <header className={styles.headerR} >

					<h1 data-aos="fade-right" style={{ fontWeight: "bold", color:"black",textAlign:"center" }}>Welcome to Uber Support</h1>
					<p data-aos="fade-right" style={{color:"black", textAlign:"center"}}>
						We're here to help. Looking for customer service contact information? Explore support resources for the relevant products below to find the best way to reach out about your issue.
					</p>

				</header> */}
				{/* hero start */}
				<section className="w-full px-4">
            <div className="w-full flex flex-col items-start">
                <div className="w-full mb-4">
                    <div className="flex items-center gap-2">
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            transition={{
                                ease: [0.86, 0, 0.07, 0.995],
                                duration: 1,
                                delay: 1.5,
                            }}
                            className="inline-block"
                        >
                            <Image
							width={90}
							height={70}
                                src={contactHero}
                                alt="img"
                                className="object-cover rounded-[10px]  xl:mt-[15px] mt-[10px]"
                            />
                        </motion.span>
                        <h1 className="text-[100px] mt-5 tracking-[-1.3px] text-[#212121] font-bold uppercase leading-none">
                            Uber Support   
                        </h1>
                    </div>
                    <h1 className="text-[100px] tracking-[-1.3px] text-[#212121] font-bold uppercase leading-none mt-[20px] mb-[30px]">
                        We're here to help
                    </h1>
                </div>
            </div>
        </section>
				{/* hero end */}
			{/* <div className={styles.uberSupport} style={{
				backgroundImage: `url(${background.src})`,
				width: '100%',
				height: '100%',
			}}>
				<header className={styles.headerR} >

					<h1 data-aos="fade-right" style={{ fontWeight: "bold" }}>Welcome to Uber Support</h1>
					<p data-aos="fade-right">
						We're here to help. Looking for customer service contact information? Explore support resources for the relevant products below to find the best way to reach out about your issue.
					</p>

				</header>
				<div className={styles.supportOptions}>
					<div className={styles.supportOption} data-aos="fade-up">
						<Image src={rid} alt="Riders" />
						<h2>Riders</h2>
					</div>
					<div className={styles.supportOption} data-aos="fade-up">
						<Image src={whe} alt="Driving & Delivering" />
						<h2>Driving & Delivering</h2>
					</div>
					<div className={styles.supportOption} data-aos="fade-up">
						<Image src={cut} alt="Uber Eats" />
						<h2>Uber Eats</h2>
					</div>
					<div className={styles.supportOption} data-aos="fade-up">
						<Image src={win} alt="Merchants & Restaurants" />
						<h2>Merchants & Restaurants</h2>
					</div>
					<div className={styles.supportOption} data-aos="fade-up">
						<Image src={bik} alt="Bikes & Scooters" />
						<h2>Bikes & Scooters</h2>
					</div>
					<div className={styles.supportOption} data-aos="fade-up">
						<Image src={bus} alt="Business" />
						<h2>Business</h2>
					</div>
					<div className={styles.supportOption} data-aos="fade-up">
						<Image src={tru} alt="Freight" />
						<h2>Freight</h2>
					</div>
				</div>
			</div> */}
			 <SmoothScroll>
      <main className={styless.main}>
        <Earth />
        <Projects />
      </main>
    </SmoothScroll>
			<div className="p-5" data-aos="fade-right">
				<h2 style={{textAlign:"center", fontSize:40,fontWeight:"bold",marginBottom:30,marginTop:10}}>Get In Touch</h2>
				<form onSubmit={handleSubmit} className={style.contactForm}>
					<div className={style.formGroup}>
						<label className={style.label}>Username:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className={style.formControl}
							placeholder="Enter your username"
						/>
					</div>
					<div className={style.formGroup}>
						<label className={style.label}>Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className={style.formControl}
							placeholder="Enter your email"
						/>
					</div>
					<div className={style.formGroup}>
						<label className={style.label}>Message:</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							required
							className={style.formControl}
							placeholder="Enter your message"
						/>
					</div>
					<button type="submit" className={style.btnPrimary}>
						Send Message
					</button>
					{error && <p style={{ color: 'ed' }}>{error}</p>}
				</form>
			</div>
			
				{/* locomotive social */}
				<section
  className="w-full h-[200vh] sm:h-screen xm:h-screen bg-about padding-y relative rounded-t-2xl" 
  ref={container}
  style={{ backgroundColor: '#bada3c', backgroundSize: 'cover' }}
>
  <div className="w-full h-full flex justify-center items-center flex-col relative">
    <div className="flex flex-col justify-center items-center text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-[140px] -mb-20 leading-[160px] lg:text-[140px] lg:leading-[140px] md:text-[70px] md:leading-[70px] sm:text-[60px] sm:leading-[64px] xm:text-[50px] xm:leading-[58px] font-bold font-FoundersGrotesk text-secondry uppercase pointer-events-none">
        <TextMask>{phrase}</TextMask>
      </h1>
      <motion.div
        className="flex justify-center items-center"
        style={{ y: mq }}
      >
        <Eyes className="w-[230px] h-[230px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] xm:w-[150px] xm:h-[150px] sm:flex-col xm:flex-col" />
      </motion.div>
    </div>
    <div className="w-full border-t border-[#21212155] pt-[20px] absolute bottom-0">
      <div className="w-full flex sm:flex-col xm:flex-col justify-between gap-y-[20px] padding-x">
        <div className="w-[50%] sm:w-full xm:w-full">
          <h3 className="paragraph font-medium text-secondry font-NeueMontreal">
            Our contact
          </h3>
        </div>
        <div className="w-[50%] sm:w-full xm:w-full flex sm:flex-col xm:flex-col justify-between gap-y-[20px]">
          <div className="flex w-fit h-fit gap-x-[5px] group">
            <div className="rounded-[50px] border-[2px] border-[#21212155] group-hover:bg-secondry py-[3px] px-[12px] cursor-pointer">
              <Link
                href="mailto:sohammamdyal@gmail.com"
                className="paragraph font-NeueMontreal text-secondry uppercase group-hover:text-background transition-all duration-200 ease-in"
              >
                sohammamdyal@gmail.com
              </Link>
            </div>
            <div className="w-[33px] flex items-center justify-center h-[33px] border-[2px] border-[#21212155] rounded-[50px] group-hover:bg-secondry transition-all duration-200 ease-in cursor-pointer sm:hidden xm:hidden">
              <p className="paragraph font-normal text-secondry group-hover:text-background">
                <ArrowUpRight size={24} strokeWidth={1.25} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

	
			
			{/* locomotive social */}
			<div className="bg-black h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
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
						<p className="text-white font-bold text-2xl pb-4">Product</p>
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
	)
}

export default page;