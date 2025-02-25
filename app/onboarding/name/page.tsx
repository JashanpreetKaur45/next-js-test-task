"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "../../components/stepper";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../redux/slice/onboardingSlice";
import Image from "next/image";
const NameStep = () => {

  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  // Get name from Redux store
  const name = useSelector((state: any) => state.onboarding.name) || "";
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim()) {
      router.push("/onboarding/preferences");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ field: "name", value: e.target.value }));
    
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
      <Stepper step={1} />

      {/* Heading */}
      <h2 className="text-[28px] font-bold mt-6">First, what’s your name?</h2>

      {/* Input Field */}
      <div className="mt-4 w-[400px]">
        <label className="block text-sm font-medium">First name</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:border-black focus:ring-0"
          value={name}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          onKeyDown={handleKeyPress}
          placeholder="Enter your first name"
        />

        {/* Below Input: Left (Button & Press Enter) | Right (Required Message) */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-3">
            {/* Continue Button - Left Aligned & Always Black */}
            <button
              className={`px-6 py-3 rounded-full font-semibold w-40 h-12 flex items-center justify-center ${name.trim()
                  ? "bg-black text-white cursor-pointer"
                  : "bg-black text-gray-400 cursor-not-allowed"
                }`}
              disabled={!name.trim()}
              onClick={() => router.push("/onboarding/preferences")}
            >
              Continue
            </button>

            {/* Press Enter Text - Next to Button */}
            <div className="text-xs flex flex-col items-start text-gray-500">
              <span className="leading-none">press</span>
              <span className="leading-none font-bold">Enter</span>
              <span className="leading-none">↵</span>
            </div>
          </div>

          {/* Required Message - Right Aligned */}
          {touched && name.trim() === "" && (
            <span className="text-red-500 text-xs border border-red-500 px-2 py-[2px] rounded">
              Required
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameStep;
