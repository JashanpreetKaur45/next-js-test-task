"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "../components/stepper";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { updateField } from "../redux/slice/onboardingSlice";
import { registerUser } from "../redux/thunk/createOnBoardingThunk";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector((state: any) => state.onboarding.loading);
  const error = useSelector((state: any) => state.onboarding.error);
  const email = useSelector((state: any) => state.onboarding.email);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ field: "email", value: e.target.value }));
  }

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    try {
      const resultAction = dispatch(registerUser());
      const result:any = await (await resultAction).payload;
      console.log(error)
      if (result?.message === "User registered, OTP sent") {
        router.push(`/onboarding/verifyEmail?email=${encodeURIComponent(email)}`);
      }else if(result === "User already registered"){
        alert("User already registered")
      }
    }catch (error: any) {
      console.log(error)
      alert(error?.message);
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

      {/* Stepper with Submit step highlighted */}
      <div className="w-full max-w-lg">
        <Stepper step={4} />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold mt-6 text-center">
        Lastly, what’s your email?
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm text-center mt-2">
        Don’t worry—we hate spam as much as you do.
      </p>

      {/* Email Input */}
      <div className="w-full max-w-lg mt-4">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="w-full border border-gray-400 px-4 py-2 rounded text-gray-800 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      {/* Continue Button */}
      <div className="mt-6 w-full max-w-lg flex flex-col items-start">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-black text-white text-sm font-semibold py-2 px-5 rounded shadow-md hover:bg-gray-900 transition ${loading ? "cursor-not-allowed disabled" : "cursor-pointer"}`}
        >
          {loading ? "Loading..." : "Continue"}
        </button>
        <span className="text-gray-500 text-xs mt-1">press Enter ↵</span>
      </div>

      {/* Required Text */}
      <div className="mt-3 text-red-500 text-xs font-semibold">Required</div>
    </div>
  );
}
