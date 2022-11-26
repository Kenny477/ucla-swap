import { useState } from "react";
import { NavLink } from "react-router-dom";
import reactLogo from "../assets/react.svg";

function Home() {
	const [count, setCount] = useState(0);

	return (
		<div className="flex flex-col justify-center items-center h-full space-y-4 bg-[url('/../assets/images/pexels-fauxels-3184465.jpg')] bg-center bg-contain">
			<p className="text-2xl">
				A marketplace for college students by college students.
			</p>
			<NavLink
				to="/signup"
				className="text-2xl bg-primary rounded-lg p-4 text-white"
			>
				Sign up now.
			</NavLink>
		</div>
	);
}

export default Home;
