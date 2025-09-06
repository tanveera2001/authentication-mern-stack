import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader, Check, X } from "lucide-react";
import Input from "../../components/Input";
import useAuthStore from "../../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signup(email, password, name);

            navigate("/verify-email");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-[#23bfd5] drop-shadow-md">Create Account</h2>

            <form onSubmit={handleSignUp}>
                <Input
                    icon={User}
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email address"
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

                <ul className="text-sm mt-2 mb-4 space-y-1">
                    <li className="flex items-center gap-1">
                        {password.length >= 6 ? (
                            <Check className="w-4 h-4 text-[#23bfd5]" />
                        ) : (
                            <X className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={password.length >= 6 ? "text-[#23bfd5]" : "text-gray-400"}>
                            At least 6 characters
                        </span>
                    </li>
                    <li className="flex items-center gap-1">
                        {/[A-Z]/.test(password) ? (
                            <Check className="w-4 h-4 text-[#23bfd5]" />
                        ) : (
                            <X className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={/[A-Z]/.test(password) ? "text-[#23bfd5]" : "text-gray-400"}>
                            Contains uppercase letter
                        </span>
                    </li>
                    <li className="flex items-center gap-1">
                        {/[a-z]/.test(password) ? (
                            <Check className="w-4 h-4 text-[#23bfd5]" />
                        ) : (
                            <X className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={/[a-z]/.test(password) ? "text-[#23bfd5]" : "text-gray-400"}>
                            Contains lowercase letter
                        </span>
                    </li>
                    <li className="flex items-center gap-1">
                        {/[0-9]/.test(password) ? (
                            <Check className="w-4 h-4 text-[#23bfd5]" />
                        ) : (
                            <X className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={/[0-9]/.test(password) ? "text-[#23bfd5]" : "text-gray-400"}>
                            Contains a number
                        </span>
                    </li>
                    <li className="flex items-center gap-1">
                        {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? (
                            <Check className="w-4 h-4 text-[#23bfd5]" />
                        ) : (
                            <X className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-[#23bfd5]" : "text-gray-400"}>
                            Contains special character
                        </span>
                    </li>
                </ul>

                {error && (
                    <p className="text-red-400 font-medium mt-2 text-center">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-5 w-full py-2 px-4 bg-[#1853bd] text-white font-semibold rounded-lg shadow-lg hover:bg-[#133b8c] transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isLoading ? (
                        <Loader className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </form>

            <p className="text-sm text-gray-400 mt-6 text-center">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-[#23bfd5] hover:underline font-medium"
                >
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;



