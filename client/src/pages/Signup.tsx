import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import {BsEyeSlash} from "react-icons/bs";

// Shown upon clicking "Signup"
function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggle = () => {
	setShowPassword(!showPassword);
  };

  const toggleConfirmation = () => {
	setShowPasswordConfirmation(!showPasswordConfirmation);
  };

	async function signup() {
		// Make a POST request to the server endpoint /auth/signup with the email and password
		const endpoint = "/api/auth/signup";
		const body = { email, password, confirmPassword };
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

	async function onSignup() {
		if (password !== confirmPassword) {
			setError("Passwords do not match");
		} else {
			signup();
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-full space-y-8">
			<h1 className="text-2xl font-bold">Signup</h1>
			<div className="flex flex-col space-y-4 text-lg w-1/4">
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="focus:outline-0 focus:border-black border-b"
				/>
				<div  className="flex">
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
				<div className="flex">
					<input
						type={showPasswordConfirmation ? "text" : "password"}
						placeholder="confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="focus:outline-0 focus:border-black border-b grow"
					/>
					<button
						type="button"
						onClick={toggleConfirmation}>
							{showPasswordConfirmation ? <BsEyeSlash/> : <BsEye/>}
					</button>
				</div>
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
