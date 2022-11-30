import { useState } from "react";
import { NavLink } from "react-router-dom";
import { mainHero } from "../../types";

function Hero() {
	const mainHero: mainHero = {
		title: "A marketplace",
		subtitle: "for students by students",
		description: "Buy and sell from your fellow Bruins! Sign up today to trade quickly and securely",
		img: "/../../assets/images/students-upscaled.jpeg",
		primaryAction: {
			text: "Sign Up",
			href: "/signup",
		},
	};

	return (
		<main className="flex flex-row space-x-20 my-10 mx-auto max-w-7xl px-4 sm:my-12 sm:px-6 md:my-16 lg:my-32 lg:px-8 xl:my-40">
			<div className="sm:text-center lg:text-left">
				<h1 className="flex flex-col text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
					<span className="block text-primary xl:inline">{mainHero.title}</span>
					<span className={`block text-black xl:inline`}>
						{mainHero.subtitle}
					</span>
				</h1>
				<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
					{mainHero.description}
				</p>
				<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
					<div className="rounded-md shadow">
						<a
							href={mainHero.primaryAction.href}
							className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:bg-primary_darker md:py-4 md:text-lg md:px-10 text-white`}
						>
							{mainHero.primaryAction.text}
						</a>
					</div>
				</div>
			</div>
			<div className="md:block hidden">
				<img
					className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-100"
					src={mainHero.img}
					alt="image of ucla students"
				/>
			</div>
		</main>
	);
};

export default Hero;