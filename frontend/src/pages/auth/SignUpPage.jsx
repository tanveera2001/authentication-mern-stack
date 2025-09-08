import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader, Check, X } from "lucide-react";
import Input from "../../components/Input";
import useAuthStore from "../../store/authStore";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");

    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const passwordRules = {
        minLength: password.length >=6,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[^A-Za-z0-9]/.test(password),
    };

    const isPasswordValid = passwordRules.minLength && passwordRules.hasUpper && passwordRules.hasLower && passwordRules.hasNumber && passwordRules.hasSpecial;

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name.trim()) return setFormError("Name is required");
        if(!email.trim()) return setFormError("Email is required");
        if(!/\S+@\S+\.\S+/.test(email)) return setFormError("Please enter a valid email address");
        if(!isPasswordValid) return setFormError("Password does not meet all requirements");

        setFormError("");

        const success = await signup(email, password, name);
        if(success) navigate("/verify-email");
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
                Create Account
            </h2>

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



