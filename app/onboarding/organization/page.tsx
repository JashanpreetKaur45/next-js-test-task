"use client";
import { useRouter } from "next/navigation";
import Stepper from "../../components/stepper"; // Import Stepper
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "@/app/redux/slice/onboardingSlice";
import Image from "next/image";

const organizationTags = [
  { name: "Women-Led", emoji: "👩‍💼" },
  { name: "Artificial Intelligence", emoji: "🤖" },
  { name: "Startups", emoji: "🚀" },
  { name: "Disruptors", emoji: "✍️" },
  { name: "Sustainable", emoji: "🌱" },
  { name: "B Corp Certified", emoji: "🌍" },
  { name: "Tech Unicorns", emoji: "🦄" },
  { name: "Social Impact", emoji: "🤝" },
  { name: "Direct-to-Consumer", emoji: "🏬" },
  { name: "FinTech", emoji: "💳" },
  { name: "Lifestyle", emoji: "☁️" },
  { name: "Subscription-Based", emoji: "🔢" },
  { name: "High Growth", emoji: "📈" },
  { name: "Transformation", emoji: "🔄" },
  { name: "Large Enterprise", emoji: "🏢" },
];

export default function OrganizationSelection() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get selected organizations from Redux
  const selectedTags = useSelector((state: any) => state.onboarding.organization);

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t: string) => t !== tag)
      : [...selectedTags, tag];

    dispatch(updateField({ field: "organization", value: newTags }));
  };

  const handleSelectAll = () => {
    const newTags = selectedTags.length === organizationTags.length ? [] : organizationTags.map((tag) => tag.name);
    dispatch(updateField({ field: "organization", value: newTags }));
  };

  const handleContinue = () => {
    console.log("Selected Organizations:", selectedTags);
    router.push("/onboarding/education"); // Navigate to the next step (Education)
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
      {/* Step Indicator */}
      <Stepper step={3} /> {/* Organization is Step 3 */}

      {/* Title */}
      <h1 className="text-2xl font-bold">
        What type of organizations are you interested in?
      </h1>
      <p className="text-gray-600 mb-4">You can add more later.</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 w-[600px] mb-4">
        {organizationTags.map(({ name, emoji }) => (
          <button
            key={name}
            onClick={() => handleTagClick(name)}
            className={`px-3 py-2 rounded-lg border flex items-center space-x-1 ${
              selectedTags.includes(name)
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition`}
          >
            <span>{emoji}</span>
            <span>{name}</span>
          </button>
        ))}
      </div>

      {/* Select All */}
      <label className="flex items-center space-x-2 cursor-pointer mb-4">
        <input
          type="checkbox"
          checked={selectedTags.length === organizationTags.length}
          onChange={handleSelectAll}
          className="hidden"
        />
        <span className="border rounded-md px-3 py-2">
          {selectedTags.length === organizationTags.length ? "☑" : "☐"} Select All
        </span>
      </label>

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
      <p className="text-red-500 text-sm mt-2">Required</p>
    </div>
  );
}
