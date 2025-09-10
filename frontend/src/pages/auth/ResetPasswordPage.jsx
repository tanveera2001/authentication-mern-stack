import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/Input";
import { Lock, Loader, Check, X } from "lucide-react"; 
import useAuthStore from "../../store/authStore";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [formError, setFormError] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();
	const { token } = useParams();
	const navigate = useNavigate(); 

	const passwordRules = {
		minLength: password.length >= 6,
		hasUpper: /[A-Z]/.test(password),
		hasLower: /[a-z]/.test(password),
		hasNumber: /[0-9]/.test(password),
		hasSpecial: /[^A-Za-z0-9]/.test(password),
	};

	const isPasswordValid = passwordRules.minLength && passwordRules.hasUpper && passwordRules.hasLower && passwordRules.hasNumber && passwordRules.hasSpecial;

	const handleSubmit = async (e) => {
		e.preventDefault();


		if (!isPasswordValid) return setFormError("Password does not meet all requirements");
		if (password !== confirmPassword) return setFormError("Passwords do not match");

		setFormError("");


		const success = await resetPassword(token, password, confirmPassword);
		if (success) navigate("/login");
	};

	const renderRule = (isValid, text) => (
		<li className="flex items-center gap-1">
			{isValid ? <Check className="w-4 h-4 text-[#23bfd5]" /> : <X className="w-4 h-4 text-gray-400" />}
			<span className={isValid ? "text-[#23bfd5]" : "text-gray-400"}>{text}</span>
		</li>
	);

	return (
		<div>
			<h2 className="text-3xl font-bold mb-6 text-center text-[#23bfd5] drop-shadow-md">
				Reset Password
			</h2>

			<form onSubmit={handleSubmit}>
				<Input
					icon={Lock}
					type="password"
					placeholder="New Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Input
					icon={Lock}
					type="password"
					placeholder="Confirm New Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				<ul className="text-sm mt-2 mb-4 space-y-1">
					{renderRule(passwordRules.minLength, "At least 6 characters")}
					{renderRule(passwordRules.hasUpper, "Contains uppercase letter")}
					{renderRule(passwordRules.hasLower, "Contains lowercase letter")}
					{renderRule(passwordRules.hasNumber, "Contains a number")}
					{renderRule(passwordRules.hasSpecial, "Contains special character")}
				</ul>

				{(formError || error) && (
					<p className="text-red-400 font-medium mt-2 text-center">
						{formError || error}
					</p>
				)}
				{message && <p className="text-green-600 font-medium mb-4">{message}</p>}


				<button
					type="submit"
					disabled={isLoading}
					className="mt-5 w-full py-2 px-4 bg-[#1853bd] text-white font-semibold rounded-lg shadow-lg hover:bg-[#133b8c] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					{isLoading ? (
						<Loader className="w-6 h-6 animate-spin mx-auto" />
					) : (
						"Set New Password"
					)}
				</button>
			</form>
		</div>
	);
};

export default ResetPasswordPage;
