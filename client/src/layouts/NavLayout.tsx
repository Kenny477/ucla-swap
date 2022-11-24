import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

function NavLayout({authenticated}: {authenticated: boolean}) {
	return (
		<div className="flex flex-col min-h-screen">
			<Nav authenticated={authenticated} />
			<div className="h-[calc(100vh-5rem)]">
				<Outlet />
			</div>
		</div>
	);
}

export default NavLayout;
