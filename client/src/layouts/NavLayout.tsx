import React from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

function NavLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<Nav />
			<div className="h-[calc(100vh-5rem)]">
				<Outlet />
			</div>
		</div>
	);
}

export default NavLayout;
