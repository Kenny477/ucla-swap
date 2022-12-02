import { useState } from "react";
import { NavLink } from "react-router-dom";
import { mainHero2 } from "../../types";

function LargeHero() {
	const mainHero2: mainHero2 = {
		img: "/../../assets/images/students-upscaled.jpeg",
			title: "Here is our CS35L Development Team",
			subtitle: "Fall 2022",
	};
	
	return (
		<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
		  <div className="sm:text-center lg:text-left">
			<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
			  <span className="block text-primary sm:text-center">{mainHero2.title}</span>{' '}
			  <span className={`block text-black sm:text-center`}>
				{mainHero2.subtitle}
			  </span>
			</h1>
		  </div>
		</main>
	  );
	};

export default LargeHero;