import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Features";
import Contact from "../components/LandingPage/ContactUs";

function Home() {
 return (
  <div className="flex flex-col">
	<Hero />
	<Features />
	<Contact/>
  </div>
 );
};

export default Home;
