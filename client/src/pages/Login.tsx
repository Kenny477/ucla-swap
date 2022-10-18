import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function onLogin() {
    // Make a POST request to the server endpoint /users/signup with the username and password
    const endpoint = '/auth/login'
    const body = { username, password }
  }

	return (
		<div className="flex flex-col items-center justify-center h-full space-y-8">
			<h1 className="text-xl">Signup</h1>
			<div className="flex flex-col space-y-4 text-lg">
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
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
					Signup
				</button>
				<NavLink to="/login" className="text-primary">
					Already have an account? Login here.
				</NavLink>
			</div>
		</div>
  )
}

export default Login