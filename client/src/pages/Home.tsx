import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Features";

function Home() {
	return (
		<div className="flex flex-col">
			<Hero />
			<Features />
		</div>
	);
};

export default Home;
