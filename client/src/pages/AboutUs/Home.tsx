import LargeHero from "./LargeHero2";
import HeroImage from "./HeroImage2";
import Features2 from "./Features2";

function Home() { 
	return (
		<div>
			<div className="max-w-7xl mx-auto">
				<div className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}>
					<LargeHero />
				<div>
			</div>
			</div>
				<HeroImage />
			</div>
			<Features2/>
		</div>
	  );
	};

export default Home;
