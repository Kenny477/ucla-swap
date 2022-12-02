import LargeHero2 from "./LargeHero2";
import HeroImage2 from "./HeroImage2";
import Features2 from "./Features2";

function Home() { 
	return (
		<div>
			<div className="max-w-7xl mx-auto">
				<div className={`relative z-10 pb-8 bg-background sm:text-center md:text-center lg:text-center`}>
					<LargeHero2 />
				</div>
			</div>
			<Features2/>
		</div>
	  );
	};

export default Home;
