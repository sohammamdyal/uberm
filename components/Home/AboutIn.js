"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import aboutImg from './../../public/make.jpg';
import LinkHover from "./../animation/LinkHover";
import Heading from "./../Heading";
import RoundButton from './../RoundButton';

export default function About() {
	const [hovered, setHovered] = useState(false);


    const footerItems = [
        {
           id: 1,
           title: "Instagram",
           href: "https://www.instagram.com/",
        },
        {
           id: 2,
           title: "Behance",
           href: "https://www.behance.com/",
        },
        {
           id: 3,
           title: "Facebook",
           href: "https://www.facebook.com/",
        },
        {
           id: 4,
           title: "Linkedin",
           href: "https://www.linkedin.com/",
        },
     ];

	return (
		<section  className="w-full bg-[#bada3c] py-[50px] rounded-t-[20px]
     rounded-b-[20px] z-20 relative mt-[-15px] flex flex-col gap-[30px]
      items-center">
			<div className="w-full px-[50px] sm:px-[20px] text-start">
				<h2 className="text-[40px] font-medium text-black" 
                 data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 1, delay: 1 }}>
                
                Drive when you want, make what you need <br/>tech
					<br className="sm:hidden xm:hidden" /> businesses that need to&nbsp;
					<span className="underline cursor-pointer">raise funds,<br/></span>
					&nbsp;sell products, <br className="sm:hidden xm:hidden" />
					<span className="underline cursor-pointer">explain complex ideas,<br/></span>
					
					
				</h2>
			</div>
			<div className="w-full border-t border-b border-[#21212155] my-[50px] py-[20px]">
				<div className="px-[50px] flex sm:flex-col xm:flex-col gap-[30px] justify-between">
					<div className="w-[50%] sm:w-full xm:w-full">
						<h3 className="text-[24px] font-semibold text-black"
                        data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}>
							What you can expect?
						</h3>
					</div>
					<div className="w-[50%] sm:w-full xm:w-full">
						<div className="w-full flex gap-[30px] items-start sm:flex-col xm:flex-col">
							<div className="w-[60%] sm:w-full xm:w-full">
								<p className="text-[18px] font-medium text-black"
                                data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 1.3 }}>
                                Make money on your schedule with deliveries 
                                or rides—or both.<br/> You can use your own car or
                                 choose a rental through Uber.
								</p>
								<p className="text-[18px] font-medium text-black pt-[30px]"
                                data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 1.5 }}>
									We can also community of Uber Eats, <br/>Uber Products,
                                    Uber Cab, Uber Auto and Uber Bicycle.
								</p>
							</div>
							<div className="flex flex-col sm:w-full xm:w-full"
                            data-aos="fade-left" initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 1, delay: 1.7 }}>
								<h4 className="text-[18px] font-medium text-black pb-[20px]">
									S:
								</h4>
								<div className="flex flex-col gap-[10px]">
									{footerItems.map((item) => (
										<LinkHover
											key={item.id}
											className="text-[18px] font-medium text-black hover:underline"
											title={item.title}
											href={item.href}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-col md:flex-row sm:flex-col xm:flex-col px-[50px] md:px-[30px] sm:px-[20px] xm:px-[20px] gap-[30px]">
  <div className="flex flex-col gap-[30px]">
    <Heading title="Our approach:" />
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
  <div
    className={`flex items-center justify-center w-full md:w-[50%] sm:w-[45%] xm:w-[45%] transition transform duration-[1.5s] ease-[.215,.61,.355,1] rounded-[15px] overflow-hidden hover:scale-[0.96] ${
      hovered && "scale-[0.96]"
    }`}
    style={{ marginLeft: '400px' }}
   
  >
    <Image
      src={aboutImg}
      alt="about-img"
      className={`w-80 h-80 transition rounded-xl transform duration-[2s] ease-[.215,.61,.355,1] ${
        hovered && "scale-[1.09]"
      }`}
      style={{ marginLeft: '80px' }}
    />
  </div>
</div>

		</section>
	);
}
