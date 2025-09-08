import useAuthStore from "../store/authStore";


const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	// Format date directly in this file
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

	return (
		<div className="max-w-md w-full mx-auto mt-20 p-8 bg-white border border-[#fcbf49] rounded-lg shadow-lg">
			<h2 className="text-3xl font-bold mb-6 text-center text-[#d62828]">
				Dashboard
			</h2>

			<div className="space-y-6">
				<div className="p-4 bg-white/70 backdrop-blur-md rounded-lg border border-[#b3b3b3]">
					<h3 className="text-xl font-semibold text-[#3a5a40] mb-3">Profile Information</h3>
					<p className="text-[#111]">Name: {user.name}</p>
					<p className="text-[#111]">Email: {user.email}</p>
				</div>

				<div className="p-4 bg-white/70 backdrop-blur-md rounded-lg border border-[#b3b3b3]">
					<h3 className="text-xl font-semibold text-[#3a5a40] mb-3">Account Activity</h3>
					<p className="text-[#111]">
						<span className="font-bold">Joined: </span>
						{formatDate(user.createdAt)}
					</p>
					<p className="text-[#111]">
						<span className="font-bold">Last Login: </span>
						{formatDate(user.lastLogin)}
					</p>
				</div>
			</div>

			<div className="mt-6">
				<button
					onClick={handleLogout}
					className="w-full py-3 px-4 bg-[#d62828] text-white font-bold rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#3a5a40] focus:ring-offset-2 transition duration-200"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default DashboardPage;
