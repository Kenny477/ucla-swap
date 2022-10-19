import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const [cookies, setCookie] = useCookies(["access_token"]);

	async function onLogin() {
		// Make a POST request to the server endpoint /users/signup with the email and password
		const endpoint = "/api/auth/login";
		const body = { email, password };
		const res = await axios
			.post(endpoint, body, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
			})
			.then((res) => {
				// console.log(res);
				const expires = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12 hours
				setCookie("access_token", res.data.access_token, {
					path: "/",
					expires,
				});
				if (res.status === 201) {
					navigate("/feed");
				}
			});
	}

	return (
		<div className="flex flex-col items-center justify-center h-full space-y-8">
			<h1 className="text-xl">Login</h1>
			<div className="flex flex-col space-y-4 text-lg">
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="focus:outline-0 focus:border-black border-b"
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="focus:outline-0 focus:border-black border-b"
				/>
				<button
					type="button"
					onClick={onLogin}
					className="bg-primary rounded-lg p-4 text-white"
				>
					Login
				</button>
				<NavLink to="/signup" className="text-primary">
					Don't have an account. Signup here.
				</NavLink>
			</div>
		</div>
	);
}

export default Login;
