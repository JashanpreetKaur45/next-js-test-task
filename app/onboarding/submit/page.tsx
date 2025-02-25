"use client";
import { useRouter } from "next/navigation";
import Stepper from "../../components/stepper";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "@/app/redux/slice/onboardingSlice";
import Image from "next/image";


export default function PreferencesSelection() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get selected referral sources from Redux
  const selectedOptions = useSelector((state: any) => state.onboarding.referralSource);

  const options = [
    "Friend or colleague",
    "Newsletter",
    "Google Search",
    "Career Services Office",
    "Professor or Academic Advisor",
    "LinkedIn",
    "Other",
  ];

  const handleCheckboxChange = (option: string) => {
    const newOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item: string) => item !== option)
      : [...selectedOptions, option];

    dispatch(updateField({ field: "referralSource", value: newOptions }));
  };

  const handleContinue = () => {
    if (selectedOptions.length === 0) {
      alert("Please select at least one option.");
      return;
    }
    router.push("/onboarding");
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

      {/* Stepper with Preferences step highlighted */}
      <div className="w-full max-w-lg">
        <Stepper step={2} />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold mt-6 text-center">
        How did you hear about us?
      </h1>

      {/* Options List */}
      <div className="w-full max-w-lg mt-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 py-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 text-black border-gray-400 focus:ring-0"
            />
            <span className="text-gray-700 text-sm">{option}</span>
          </label>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-6 w-full max-w-lg flex flex-col items-start">
        <button
          onClick={handleContinue}
          className="bg-black text-white text-sm font-semibold py-2 px-5 rounded shadow-md hover:bg-gray-900 transition"
        >
          Continue
        </button>
        <span className="text-gray-500 text-xs mt-1">press Enter ↵</span>
      </div>
    </div>
  );
}
