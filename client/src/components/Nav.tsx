import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

function Nav() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies();

	useEffect(() => {
		setLoggedIn(!!cookies.access_token);
	}, [cookies]);

	function handleLogout() {
		removeCookie("access_token", { path: "/" });
	}

	return (
		<div className="flex flex-row justify-between items-center h-20 px-20 bg-primary text-white">
			<NavLink
				to={loggedIn ? "/feed" : "/"}
				className="text-xl font-bold"
			>
				UCLA Swap
			</NavLink>
			<div className="flex flex-row space-x-4 text-lg">
				<NavLink to="/feed">Feed</NavLink>
				{loggedIn ? (
					<>
						<NavLink to="/profile">Profile</NavLink>
						<p onClick={handleLogout} className="cursor-pointer">
							Logout
						</p>
					</>
				) : (
					<>
						<NavLink to="/signup">Signup</NavLink>
						<NavLink to="/login">Login</NavLink>
					</>
				)}
			</div>
		</div>
	);
}

export default Nav;
