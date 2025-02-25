"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { verifyOtp } from "../../redux/thunk/createOnBoardingThunk";
import router from "next/router";
import Image from "next/image";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const email = searchParams.get("email") || "";
  const route = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next field if input is filled
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerfiyOtp = async () => {
    const otpValue = otp.join("");

    try {
      setLoading(true);
      const resultAction = await dispatch(verifyOtp({ email, otp: otpValue }));
      setLoading(false);
      // Check if the action was successful
      if (verifyOtp.fulfilled.match(resultAction)) {
        const result = resultAction.payload; // No need for extra `await`

        if (result?.message === "Email verified successfully") {
          alert("Email verified successfully");
          // Use setTimeout to allow alert to complete before navigation
          setTimeout(() => {
            route.push("/onboarding/welcome");
          }, 100);
          setOtp(Array(6).fill(""));
        } else {
          alert("Invalid OTP");
        }
      } else {
        setLoading(false);
        // If the action was rejected, handle error properly
        alert(resultAction.payload || "Invalid OTP");
      }
    } catch (error) {
      setLoading(false);

      console.error("OTP Verification Error:", error);
      alert("An unexpected error occurred while verifying OTP.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      {/* Logo in the top-left corner */}
      <Image
        src="/logo.png" // Ensure it's in the 'public' folder
        alt="Paths Logo"
        width={80}
        height={40}
        className="absolute top-5 left-5"
      />
      <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
      <p className="text-gray-500 mb-4">
        Enter the verification code sent to <span className="text-black">{email}</span>.
      </p>

      <div className="flex space-x-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-10 h-10 border border-gray-300 text-center text-lg"
          />
        ))}
      </div>


      <p className="text-gray-500 mb-4 text-sm">
        Didn’t receive a code? <span className="text-blue-500 cursor-pointer">Resend</span>
      </p>

      <button 
      className={`px-6 py-2 bg-black text-white rounded ${loading ? "cursor-not-allowed disabled" : "cursor-pointer"}`} onClick={handleVerfiyOtp}
      disabled={loading}
      >
        {loading ? "loading..." : "Verify"}
      </button>
    </div>
  );
};

export default VerifyEmailPage;
