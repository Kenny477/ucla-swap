import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";

function Nav({ authenticated }: { authenticated: boolean }) {
	const [cookies, setCookie, removeCookie] = useCookies();

	const navigate = useNavigate();

	function handleLogout() {
		removeCookie("access_token", { path: "/" });
		navigate("/");
	}

	return (
		<div className="flex flex-row justify-between items-center h-20 px-20 bg-primary text-white">
			<NavLink
				to={authenticated ? "/feed" : "/"}
				className="text-xl font-bold"
			>
				UCLA Swap
			</NavLink>
			<div className="flex flex-row space-x-4 text-lg">
				{authenticated ? (
					<>
						<NavLink to="/feed">Feed</NavLink>
						<NavLink to="/profile/">Profile</NavLink>
						<p onClick={handleLogout} className="cursor-pointer">
							Logout
						</p>
					</>
				) : (
					<>
						<NavLink to="/signup">Signup</NavLink>
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/AboutUs">AboutUs</NavLink>
					</>
				)}
			</div>
		</div>
	);
}

export default Nav;
