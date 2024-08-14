"use client"
import React, { useEffect, useState } from 'react';
import styles from './../styles/Drive.module.css'
import Image from 'next/image';
import leftB from './../../public/driver.png'
import Link from 'next/link';
import Ill from './../../public/car.png';
import './../../styles/Drive.css';
import Dri from './../../public/driver.jpg'
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import AOS from 'aos';
import "aos/dist/aos.css";
import { FaCalendarAlt } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdStarPurple500 } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { FaRegCircleCheck } from "react-icons/fa6";
import PreloaderDriver from './../../components/PreloaderDriver';
import Team1 from "./../../public/ceo.jpg";
import logo from './../../public/logo.png';
import Marquee from "./../../components/Marquee";
import './../../styles/global.css'
import AnimCursor from './../../components/AnimCoursor';
function App() {
  useEffect(()=>{
    AOS.init({duration:2000});
  },[]);
  const [activeTab, setActiveTab] = useState('drive');
  return (
    
    <div>
      <AnimCursor/>
      <PreloaderDriver/>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.head} data-aos="fade-right">Drive</h1>
        <nav className={styles.navB} data-aos="fade-left">
          <ul className={styles.listD} >
         
            {/* <Link href='/signin' >Sign in</Link> */}
           
          {/* <li className={styles.li}><Link href='/signup' >Sign up</Link></li> */}
         
  <Link class="relative flex h-[50px] w-40 items-center justify-center overflow-hidden rounded-full
   bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full
    before:bg-blue-600 before:duration-500 before:ease-out hover:blue-600 hover:before:h-56 
    hover:before:w-56 mr-5" href='/signin'>
      <span class="relative z-10">Sign In</span>
    </Link>
          
  <Link class="relative flex h-[50px] w-40 items-center justify-center overflow-hidden rounded-full
   bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full
    before:bg-blue-600 before:duration-500 before:ease-out hover:blue-600 hover:before:h-56 
    hover:before:w-56" href='/signup'>
      <span class="relative z-10">Sign Up</span>
    </Link>
 
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          <h2 className={styles.headM} data-aos="fade-right">Drive when you want, make what you need</h2>
          <p className={styles.parad} data-aos="fade-right">Earn on your own schedule.</p>

         
            <Link class="relative flex h-[50px] w-40 items-center justify-center overflow-hidden rounded-xl
   bg-white text-black shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full
    before:bg-blue-600 before:duration-500 before:ease-out hover:blue-600 hover:before:h-56 
    hover:before:w-56 mr-5" href='/signin' data-aos="fade-right">
      <span class="relative z-10" data-aos="fade-right">Get Started</span>
    </Link>
          <span className={styles.signIn} data-aos="fade-right">Already have an account? <Link href='/Home'>Sign in</Link></span>
        </div>
        <div className={styles.image} data-aos="fade-left">
          <Image src={leftB} alt="Driver in car" className={styles.mainImg} />
        </div>
      </main>

    </div>
    {/* 2nd sesstion */}
    <div className="App">
      <section className="why-drive">
        <h2 className='h2' data-aos="fade-right">Why drive with us</h2>
        <div className="illustration">
          <Image src={Dri} alt="Drivers" data-aos="fade-right" />
        </div>
        <div className="benefits">
          <div className="benefit-item" data-aos="fade-right">
          <FaCalendarAlt className="inline-block mr-3 text-5xl mb-3" />
            <h3>Set your own hours</h3>
            <p>You decide when and how often you drive.</p>
          </div>  
          <div className="benefit-item" data-aos="fade-up">
          <GiCash className="inline-block mr-3 text-5xl mb-3" />
            <h3>Get paid fast</h3>
            <p>Weekly payments in your bank account.</p>
          </div>
          <div className="benefit-item" data-aos="fade-left">
          <MdOutlineSupportAgent className="inline-block mr-3 text-5xl mb-3" />
            
            <h3>Get support at every turn</h3>
            <p>If there’s anything that you need, you can reach us anytime.</p>
          </div>
        </div>
      </section>
    </div>

    {/* marqueee start */}
    <section className="w-full bg-[#004d3a] min-h-screen rounded-t-[20px]">
    <div className="w-full bg-[#004d3a] z-10 relative rounded-t-[20px] py-8">
        <Marquee
            title="the uber ceo"
            className="pb-[50px] lg:pb-[40px] md:pb-[30px] sm:pb-[25px] xm:pb-[18px] text-[540px] leading-[330px] lg:text-[380px] lg:leading-[240px] md:text-[300px] md:leading-[160px] sm:text-[230px] sm:leading-[140px] xm:text-[130px] xm:leading-[80px]"
        />
    </div>
    <div className="w-full bg-[#004d3a] flex items-center justify-center pb-[50px]">
        <div className="w-[70%] p-[20px] bg-[#D3D3D3] rounded-[20px] sm:w-100 xm:w-100 shadow-lg">
            <div className="w-full flex flex-col justify-between gap-[20px] py-[10px]">
                <div className="flex justify-between sm:flex-col xm:flex-col gap-[20px]">
                    <div>
                        <Image
                            src={logo}
                            alt="ochi-logo"
                            width={50}
                            height={50}
                        />
                    </div>
                    <div className="flex flex-col items-end ">
                        <Image
                            src={Team1}
                            alt="ochi-logo"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />
                        <p className="paragraph font-NeueMontreal font-normal text-secondary py-[10px]">
                            Founder and CEO
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-end sm:flex-col xm:flex-col sm:items-start xm:items-start">
                    <div>
                        <h1 className="heading font-bold font-FoundersGrotesk text-secondary text-[40px] sm:text-[30px]">
                        DARA  <br /> KHOSROWSHAHI
                        </h1>
                    </div>
                    <div>
                        <h1 className="heading font-bold font-FoundersGrotesk text-secondary text-[40px] sm:text-[30px]">
                            1 / 4
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    {/* marqueee end */}

    {/* 3rd session */}
    <div className="App">
      <section className="sign-up-requirements">
        <h2 data-aos="fade-right">Here's what you need to sign up</h2>
        <div className="tabs">
          <button
          data-aos="fade-right"
            className={activeTab === 'drive' ? 'active' : ''}
            onClick={() => setActiveTab('drive')}
          >
            To drive
          </button>
          <button
          data-aos="fade-left"
            className={activeTab === 'deliver' ? 'active' : ''}
            onClick={() => setActiveTab('deliver')}
          >
            To deliver
          </button>
        </div>
        <div className="requirements">
          <div className="column" data-aos="fade-right ">
          <MdStarPurple500  className="inline-block mr-3 text-3xl mb-3" />
            <h3>Requirements</h3>
            <ul>
              <li>Be at least 18 years old</li>
              <li>Clear a background screening</li>
            </ul>
          </div>
          <div className="column" data-aos="fade-up">
          <CgFileDocument  className="inline-block mr-3 text-3xl mb-3" />
            <h3>Documents</h3>
            <ul>
              <li>Valid driver’s license (private or commercial), if you plan to drive</li>
              <li>Proof of residency in your city, state or province</li>
              <li>Car documents such as commercial insurance, vehicle registration certificate, permit</li>
            </ul>
          </div>
          <div className="column" data-aos="fade-left">
          <FaRegCircleCheck  className="inline-block mr-3 text-3xl mb-3" />
            <h3>Signup process</h3>
            <ul>
              <li>Visit the nearest Partner Seva Kendra in your city</li>
              <li>Submit documents and photo</li>
              <li>Provide information for a background check</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
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


  );
}

export default App;