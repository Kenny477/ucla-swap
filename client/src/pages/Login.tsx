import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const navigate = useNavigate();

	async function onLogin() {
    // Make a POST request to the server endpoint /users/signup with the email and password
    const endpoint = '/api/auth/login'
    const body = { email, password }
		const res = await fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(body),
		});
		console.log(res);
    if(res.statusText === "Created") {
      navigate('/feed')
    }
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
  )
}

export default Login