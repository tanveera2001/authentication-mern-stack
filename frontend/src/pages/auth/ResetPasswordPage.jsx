import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/Input";
import { Lock, ArrowLeft, Loader } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { resetPassword, error, isLoading, message } = useAuthStore();
	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			await resetPassword(token, password);
			toast.success("Password reset successfully, redirecting to login...");
			setTimeout(() => navigate("/login"), 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	return (
		<div className="max-w-md w-full mx-auto mt-20 bg-white border border-[#fcbf49] rounded-lg shadow-lg">
			<div className="p-8">
				<h2 className="text-3xl font-bold mb-6 text-center text-[#d62828]">
					Reset Password
				</h2>

				{error && <p className="text-red-600 font-medium mb-4">{error}</p>}
				{message && <p className="text-green-600 font-medium mb-4">{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type="password"
						placeholder="New Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type="password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-3 px-4 mt-4 bg-[#d62828] text-white font-bold rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#3a5a40] focus:ring-opacity-50 disabled:opacity-50 transition duration-200"
					>
						{isLoading ? (
							<Loader className="size-6 animate-spin mx-auto" />
						) : (
							"Set New Password"
						)}
					</button>
				</form>
			</div>

			{/* Bottom link (same style as Forgot Password) */}
			<div className="border-t px-8 py-4 flex justify-center">
				<Link
					to="/login"
					className="text-sm text-[#3a5a40] hover:underline flex items-center font-medium"
				>
					<ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
				</Link>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
