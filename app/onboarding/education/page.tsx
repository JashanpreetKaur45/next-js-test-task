"use client";
import { useRouter } from "next/navigation";
import Stepper from "../../components/stepper";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "@/app/redux/slice/onboardingSlice";
import Image from "next/image";


export default function EducationSelection() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get education details from Redux store
  const { school, hasGraduated, graduationYear } = useSelector(
    (state: any) => state.onboarding.education
  );

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ field: "education", value: { school: e.target.value, hasGraduated, graduationYear } }));
  };

  const handleGraduationToggle = () => {
    dispatch(updateField({ field: "education", value: { school, hasGraduated: !hasGraduated, graduationYear } }));
  };

  const handleGraduationYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateField({ field: "education", value: { school, hasGraduated, graduationYear: Number(e.target.value) } }));
  };

  const handleContinue = () => {
    if (!school) {
      alert("Please enter a school name.");
      return;
    }
    console.log("Selected School:", school, "Graduation Year:", graduationYear);
    router.push("/onboarding/submit"); // Navigate to Submit step
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
      {/* Stepper with Education step highlighted */}
      <Stepper step={4} /> {/* Step 4 for Education */}

      {/* Title */}
      <h1 className="text-2xl font-bold">Which school did you (or do you) attend?</h1>
      <p className="text-gray-600 mb-4">You can add more credentials later.</p>

      {/* School Input */}
      <input
        type="text"
        value={school}
        onChange={handleSchoolChange}
        placeholder="Type here"
        className="border rounded-lg px-4 py-2 w-[400px] mb-4 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Graduation Year & Status */}
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasGraduated}
            onChange={handleGraduationToggle}
            className="hidden"
          />
          <span className="border rounded-md px-3 py-2">
            {hasGraduated ? "☑" : "☐"} I have graduated
          </span>
        </label>

        {!hasGraduated && (
          <div className="flex items-center space-x-2">
            <span>I will graduate in</span>
            <input
              type="number"
              value={graduationYear}
              onChange={handleGraduationYearChange}
              className="border rounded-lg px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="mt-6 flex items-center space-x-2">
        <button
          onClick={handleContinue}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-900 transition"
        >
          Continue
        </button>
        <span className="text-gray-500">press Enter ↵</span>
      </div>

      {/* Required Text */}
      {!school && <p className="text-red-500 text-sm mt-2">Required</p>}
    </div>
  );
}
