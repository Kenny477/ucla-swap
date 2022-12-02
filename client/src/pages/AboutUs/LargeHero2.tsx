import { useState } from "react";
import { NavLink } from "react-router-dom";
import { mainHero2 } from "../../types";

function LargeHero2() {
	const mainHero2: mainHero2 = {
			title: "Here is our CS35L Development Team",
			subtitle: "Fall 2022",
			textAlign: 'center',
	};
	
	return (
		<main className="mt-10 mx-auto max-w-7xl sm:text-center md:text-center lg:text-center">
		  <div className="sm:text-center lg:text-center">
			<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-center md:text-6xl lg:text-center">
			  <div className="block text-primary sm:text-center">{mainHero2.title}</div>
			  <div className={`block text-black sm:text-center`}>
				{mainHero2.subtitle}
			  </div>
			</h1>
		  </div>
		</main>
	  );
	};

export default LargeHero2;