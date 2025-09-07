import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const {verifyEmail, error, isLoading } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const pastedArray = pastedData.split("");

    const newCode = [...code];
    for (let i = 0; i < pastedArray.length; i++) {
      if (index + i < 6) {
        newCode[index + i] = pastedArray[i];
      }
    }
    setCode(newCode);

    const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
    const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-[#23bfd5] drop-shadow-md">
        Verify Your Email
      </h2>
      <p className="text-center text-gray-400 mb-6">
        Enter the 6-digit code sent to your email address.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(e, index)} // 👈 Added paste handler
              className="w-12 h-12 text-center text-2xl font-bold bg-white/80 text-[#071741] border border-[#1853bd]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23bfd5] focus:border-[#23bfd5] transition"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400 font-medium mt-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || code.some((digit) => !digit)}
          className="w-full py-2 px-4 bg-[#1853bd] text-white font-semibold rounded-lg shadow-lg hover:bg-[#133b8c] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default EmailVerificationPage;
