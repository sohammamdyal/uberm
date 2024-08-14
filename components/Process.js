"use client";

import { useState } from "react";

import TextHover from "./animation/TextHover";
import TextMask from './animation/TextMask';
import { motion, AnimatePresence } from "framer-motion";

export default function Process() {

    const processItem = [
        {
            id: "1",
            title: "Art",
            subTitle: "Direction",
            para: "My process starts by predicting and crafting a visual narrative for the project, making it memorable, striking, and beautiful. To ensure a successful outcome, I place great importance on deeply understanding the project brief and client needs. This involves identifying project goals, functional specifications, and conducting thorough research to gain insights into competitors and target audiences."
        },
        {
            id: "2",
            title: "Digital",
            subTitle: "Design",
            para: "During the design phase, after establishing the desired mood and tone in the art direction stage, the mission is to connect the dots and explore different design iterations. I work to create an easy-to-use and enjoyable experience that highlights the unique characteristics of each project while maintaining an elegant and satisfying user interface."
        },
        {
            id: "3",
            title: "Next JS",
            subTitle: "Development",
            para: "Next js development lies at the core of what I offer, with a focus on custom design tailored to your specific needs, setting your business apart from the competition. The main objective is to deliver a responsive website that is performant, pixel-perfect, and offers a fluid user experience with carefully crafted animations and interactions."
        },
        {
            id: "4",
            title: "Interaction",
            subTitle: "Design",
            para: "I firmly believe that motion and interactivity are essential components of the digital environment, serving as a vital link between the audience and the product. Even the smallest and most subtle motions or micro-interactions have the power to elevate the overall user experience to new heights effortlessly."
        },
    ];
    
	const [activeAccordion, setActiveAccordion] = useState(
		processItem[0]?.id || null,
	);

	const phrases = ["Process"];

	const toggleAccordion = (itemId) => {
		if (activeAccordion === itemId) {
			setActiveAccordion(null);
		} else {
			setActiveAccordion(itemId);
		}
	};

	return (
		<section className="w-full my-[100px]">
			<div className="flex sm:flex-col lg:items-center gap-x-2 border-b border-[#8D8D8D] px-[10px]">
				<h1 className="text-[#202020] uppercase leading-none sm:text-[20px] md:text-[20px] text-[20px] font-semibold">
					<TextMask>{phrases}</TextMask>
				</h1>
				<p className="text-[10px] text-[#202020] lg:mt-[40px] sm:mb-[40px] lg:ml-[50px]">
					Things I can help you with:
				</p>
			</div>
			<div className="w-[50%] items-end flex py-[50px] flex-col px-[40px]">
				{processItem.map((item) => (
					<div
						key={item.id}
						className="w-[50%] flex-col flex py-[50px] border-b border-black">
						<div
							className="flex items-center justify-between transition-all duration-500 ease-in-out cursor-pointer"
							onClick={() => toggleAccordion(item.id)}>
							<div className="flex gap-x-[40px] items-center">
								<TextHover
									titile1="0"
									subTitle1={item.id}
									titile2={item.title}
									subTitle2={item.subTitle}
								/>
							</div>
							<button className="text-[5px]">
								{activeAccordion === item.id ? "-" : "+"}
							</button>
						</div>
						<AnimatePresence>
							{activeAccordion === item.id && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{
										ease: "anticipate",
										duration: 1,
										type: "tween",
									}}>
									<p className="text-[20px] mb-[10px]">{item.para}</p>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				))}
			</div>
		</section>
	);
}
