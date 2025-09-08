import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import useAuthStore from "../../store/authStore";



const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState("");
	const { login, isLoading, error } = useAuthStore();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		if(!email.trim()) return setFormError("Email is required");
		if(!password.trim()) return setFormError("Password is required");

		setFormError("");

		const success = await login(email, password);
		if (success) navigate("/");
	};

	return (
		<div>
			<h2 className="text-3xl font-bold mb-6 text-center text-[#23bfd5] drop-shadow-md">
				Login
			</h2>

			<form onSubmit={handleLogin}>
				<Input
					icon={Mail}
					type="email"
					placeholder="Email Address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					icon={Lock}
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<div className="flex items-center justify-between mb-6">
					<Link
						to="/forgot-password"
						className="text-sm text-gray-400 hover:text-[#23bfd5] hover:underline transition"
					>
						Forgot password?
					</Link>
				</div>

				{(formError || error) && (
                	<p className="text-red-400 font-medium mt-2 text-center">
                        {formError || error}
                	</p>
                )}

				<button
					type="submit"
					disabled={isLoading}
					className="mt-5 w-full py-2 px-4 bg-[#1853bd] text-white font-semibold rounded-lg shadow-lg hover:bg-[#133b8c] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					{isLoading ? (
						<Loader className="w-6 h-6 animate-spin mx-auto" />
					) : (
						"Login"
					)}
				</button>
			</form>

			<p className="text-sm text-gray-400 mt-6 text-center">
				Don't have an account?{" "}
				<Link
					to="/signup"
					className="text-[#23bfd5] hover:underline font-medium"
				>
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
