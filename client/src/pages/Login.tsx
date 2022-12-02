import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import {BsEyeSlash} from "react-icons/bs";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const [cookies, setCookie] = useCookies(["access_token"]);

	const toggle = () => {
		setShowPassword(!showPassword);
	  };

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
			}).catch(
				(error) => {
					// console.log(error);
					if(error.response.status === 401) {
						setError("Invalid email or password");
					}
				}
			);
	}

	return (
		<div className="flex flex-col items-center justify-center h-full space-y-8">
			<h1 className="text-2xl font-bold">Login</h1>
			<div className="flex flex-col space-y-4 text-lg w-1/4">
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="focus:outline-0 focus:border-black border-b"
				/>
				<div className="flex">
					<input
						type={showPassword ? "text" : "password"}
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="focus:outline-0 focus:border-black border-b grow"
					/>
					<button
						type="button"
						onClick={toggle}>
							{showPassword ? <BsEyeSlash/> : <BsEye/>}
					</button>
				</div>
				<button
					type="button"
					onClick={onLogin}
					className="bg-primary rounded-lg p-4 text-white"
				>
					Login
				</button>
				<div className="text-red-500">{error}</div>
				<NavLink to="/signup" className="text-primary text-center">
					Don't have an account? Signup here.
				</NavLink>
				<NavLink to="/forgot-password" className="text-primary text-center">
					Forgot password?
				</NavLink>
			</div>
		</div>
	);
}

export default Login;
