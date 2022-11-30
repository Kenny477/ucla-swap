import React from 'react';
import { mainHero } from "../../types";

const HeroImage = () => {
    const mainHero: mainHero = {
		title: "A marketplace",
		subtitle: "for students by students",
		description: "Buy and sell from your fellow Bruins! Sign up today to trade quickly and securely.",
		img: "/../../assets/images/students-upscaled.jpeg",
		primaryAction: {
			text: "Sign Up",
			href: "/signup",
		},
	};

  return (
    <div className="lg:absolute lg:inset-y-20 lg:right-20 lg:w-1/3">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-100"
        src={mainHero.img}
        alt="image of ucla students"
      />
    </div>
  );
};

export default HeroImage;