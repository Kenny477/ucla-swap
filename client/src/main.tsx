import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import "./styles/fonts.css";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavLayout from "./layouts/NavLayout";
import CheckEmail from "./pages/CheckEmail";
import EmailNotVerified from "./pages/EmailNotVerified";
import EmailVerified from "./pages/EmailVerified";
import NewListing from "./pages/NewListing";
import { CookiesProvider } from "react-cookie";
import Listing from "./pages/Listing";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<CookiesProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<NavLayout />}>
						<Route index element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/listing/:id" element={<Listing />} />
						<Route path="/new-listing" element={<NewListing />} />
						<Route path="/check-email" element={<CheckEmail />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/reset-password" element={<ResetPassword />} />
						<Route
							path="/email-verified"
							element={<EmailVerified />}
						/>
						<Route
							path="/email-not-verified"
							element={<EmailNotVerified />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</CookiesProvider>
	</React.StrictMode>
);
