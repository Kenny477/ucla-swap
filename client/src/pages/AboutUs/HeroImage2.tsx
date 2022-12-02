import React from 'react';
import { mainHero2 } from "../../types";

const HeroImage2 = () => {
    const mainHero2: mainHero2 = {
    img: "/../../assets/images/students-upscaled.jpeg",
		title: "Here is our CS35L Development Team",
		subtitle: "Fall 2022",
	};

  return (
    <div className="lg:absolute lg:inset-y-20 lg:right-20 lg:w-1/3">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-100"
        src={mainHero2.img}
        alt="image of ucla students"
      />
    </div>
  );
};

export default HeroImage2;