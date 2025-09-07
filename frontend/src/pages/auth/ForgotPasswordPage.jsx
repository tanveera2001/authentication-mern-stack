import { useState } from "react";
import Input from "../../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

	return (
		<div>
			<h2 className="text-3xl font-bold mb-6 text-center text-[#23bfd5] drop-shadow-md">
				Forgot Password
			</h2>

			{!isSubmitted ? (
				<form onSubmit={handleSubmit}>
					<p className="text-center text-[#4c648c] mb-6">
						Enter your email address and we'll send you a link to reset your password.
					</p>

					<Input
						icon={Mail}
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-2 px-4 bg-[#1853bd] text-white font-semibold 
							rounded-lg shadow-lg hover:bg-[#133b8c] transition 
							disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? (
							<Loader className="w-6 h-6 animate-spin mx-auto" />
						) : (
							"Send Reset Link"
						)}
					</button>
				</form>
			) : (
				<div className="text-center">
					<div className="w-16 h-16 bg-[#23bfd5] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
						<Mail className="h-8 w-8 text-white" />
					</div>
					<p className="text-[#4c648c] mb-6">
						If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
					</p>
				</div>
			)}

			<div className="mt-6 text-center">
				<Link
					to="/login"
					className="text-sm text-[#4c648c] hover:text-[#23bfd5] hover:underline flex items-center justify-center transition font-medium"
				>
					<ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
				</Link>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
