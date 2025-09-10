
import useAuthStore from "../store/authStore";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

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
		<div className="max-w-3xl mx-auto mt-16 p-10 bg-gradient-to-br from-[#23bfd5]/10 to-[#1853bd]/10 rounded-2xl shadow-xl border border-[#23bfd5]/30">

			<h2 className="text-4xl font-extrabold mb-10 text-center text-[#1853bd] tracking-wide drop-shadow">
				Welcome, {user?.name || "User"} 👋
			</h2>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-[#1853bd]">
					<h3 className="text-xl font-semibold text-[#133b8c] mb-3">Profile</h3>
					<p className="text-gray-700">
						<span className="font-bold">Name: </span>{user.name}
					</p>
					<p className="text-gray-700">
						<span className="font-bold">Email: </span>{user.email}
					</p>
				</div>

				<div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-[#1853bd]">
					<h3 className="text-xl font-semibold text-[#133b8c] mb-3">Account Activity</h3>
					<p className="text-gray-700">
						<span className="font-bold">Joined: </span>
						{user.createdAt ? formatDate(user.createdAt) : "N/A"}
					</p>
					<p className="text-gray-700">
						<span className="font-bold">Last Login: </span>
						{user.lastLogin ? formatDate(user.lastLogin) : "Never"}
					</p>
				</div>
			</div>

			<div className="mt-10 text-center">
				<button
					onClick={handleLogout}
					className="px-8 py-3 bg-[#1853bd] text-white font-semibold rounded-lg shadow-lg hover:bg-[#133b8c] transition duration-200 cursor-pointer"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default DashboardPage;
