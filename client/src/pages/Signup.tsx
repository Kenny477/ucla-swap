import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

  const navigate = useNavigate();

	async function onSignup() {
		// Make a POST request to the server endpoint /auth/signup with the email and password
		const endpoint = "/api/auth/signup";
		const body = { email, password };
		const res = await axios.post(endpoint, body, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
		}).then(res => {
			if(res.status === 201) {
				navigate('/check-email')
			}
		}).catch(err => {
			if(err.response.status === 400) {
				setError(err.response.data.message)
			}
		});
	}

	return (
		<div className="flex flex-col items-center justify-center h-full space-y-8">
			<h1 className="text-xl">Signup</h1>
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
					onClick={onSignup}
					className="bg-primary rounded-lg p-4 text-white"
				>
					Signup
				</button>
				<p className="text-red-600">{error}</p>
				<NavLink to="/login" className="text-primary">
					Already have an account? Login here.
				</NavLink>
			</div>
		</div>
	);
}

export default Signup;
