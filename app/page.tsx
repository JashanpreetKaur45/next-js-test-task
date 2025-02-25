"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../app/redux/slice/onboardingSlice"; // Adjust path if needed
import Image from "next/image";


const Join = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Get clientType from Redux
  const selectedRole = useSelector((state: any) => state.onboarding.clientType);

  const handleSelectRole = (role: "client" | "talent") => {
    dispatch(updateField({ field: "clientType", value: role }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
    <Image 
      src="/logo.png"  // Ensure the image is inside the 'public' folder
      alt="Paths Logo" 
      width={80} 
      height={40} 
      className="absolute top-5 left-5"
    />
      <h2 className="text-3xl font-bold mb-6">Join as a client or talent</h2>

      <div className="flex space-x-6 mb-6">
        <button
          className={`flex items-center justify-between w-72 p-4 border-2 rounded-lg transition-all ${
            selectedRole === "client" ? "border-black" : "border-gray-300"
          }`}
          onClick={() => handleSelectRole("client")}
        >
          <span className="text-xl">🚀 I'm a client, hiring for a project</span>
          <input type="checkbox" checked={selectedRole === "client"} readOnly className="w-5 h-5" />
        </button>

        <button
          className={`flex items-center justify-between w-72 p-4 border-2 rounded-lg transition-all ${
            selectedRole === "talent" ? "border-black" : "border-gray-300"
          }`}
          onClick={() => handleSelectRole("talent")}
        >
          <span className="text-xl">👨‍💻 I'm talent, looking for projects</span>
          <input type="checkbox" checked={selectedRole === "talent"} readOnly className="w-5 h-5" />
        </button>
      </div>

      <button
        className={`w-72 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
          selectedRole ? "bg-black cursor-pointer" : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedRole}
        onClick={() => selectedRole && router.push("/onboarding/name")}
      >
        {selectedRole === "client" ? "Join as a Client" : selectedRole === "talent" ? "Join as Talent" : "Create Account"}
      </button>
      <p className="mt-4 text-sm font-medium text-gray-600">
        Already have an account? <span className="font-semibold text-black cursor-pointer hover:text-gray-800 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[3px] after:bg-gradient-to-r after:from-yellow-500 after:via-pink-500 after:to-blue-500" onClick={() => router.push("/login")}>
          Log In
        </span>
      </p>
    </div>
  );
};

export default Join;
