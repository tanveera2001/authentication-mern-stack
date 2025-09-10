import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="min-h-screen relative flex items-center justify-center">
			<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/auth-bg/auth-bg.jpg')" }}></div>

			<div className="absolute inset-0 bg-gradient-to-br from-[#040514]/40 via-[#0c2b6b]/40 to-[#09465f]/45"></div>

			<div className="relative w-full max-w-md px-4">
				<div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
