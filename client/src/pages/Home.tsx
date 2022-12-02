import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Features";
import Contact from "../components/LandingPage/ContactUs";

// Both the dedicated LandingPage and Home Page after login
// No dedicated navigation to "Home" from "Feed" aside from searchbar
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
