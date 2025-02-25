"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Circle } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { updateField } from "@/app/redux/slice/onboardingSlice";
import Image from "next/image";
const categories = [
  { name: "Strategy", emoji: "📈" },
  { name: "Growth", emoji: "🌱" },
  { name: "Finance", emoji: "💰" },
  { name: "Technology", emoji: "🖥️" },
  { name: "Non-Profits", emoji: "🤝" },
];

const tags = [
  { name: "Go-To-Market Strategy 🚀", category: "Growth" },
  { name: "Sales & Marketing 📈", category: "Growth" },
  { name: "Customer Segmentation 🧐", category: "Growth" },
  { name: "Competitor Analysis 🏆", category: "Strategy" },
  { name: "Financial Modeling 📊", category: "Finance" },
  { name: "Product Strategy 🛠️", category: "Strategy" },
  { name: "Cyber Security 🔒", category: "Technology" },
  { name: "Data Analytics 📊", category: "Strategy" },
  { name: "Grants & Non-Profits 🤲", category: "Non-Profits" },
];

export default function Preferences() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { categories: selectedCategories, tags: selectedTags } = useSelector(
    (state: any) => state.onboarding.preferences
  );

  const handleCategoryClick = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c: string) => c !== category)
      : [...selectedCategories, category];

    // Auto-select related tags
    const relatedTags = tags.filter((tag) => tag.category === category).map((tag) => tag.name);
    const newTags = selectedCategories.includes(category)
      ? selectedTags.filter((t: string) => !relatedTags.includes(t))
      : [...new Set([...selectedTags, ...relatedTags])];

    dispatch(updateField({ field: "preferences", value: { categories: newCategories, tags: newTags } }));
  };

  const handleTagClick = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t: string) => t !== tag)
      : [...selectedTags, tag];

    dispatch(updateField({ field: "preferences", value: { categories: selectedCategories, tags: newTags } }));
  };

  const handleContinue = () => {
    router.push("/onboarding/organization"); // Navigates to Organization screen
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
      <div className="flex space-x-4 mb-8">
        {["Name", "Preferences", "Education", "Submit"].map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            {index === 1 ? (
              <CheckCircle className="text-black w-6 h-6" />
            ) : (
              <Circle className="text-gray-400 w-6 h-6" />
            )}
            <span className={index === 1 ? "font-bold" : "text-gray-400"}>{step}</span>
          </div>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold">What projects are you interested in?</h1>
      <p className="text-gray-600 mb-4">Select as many as you like</p>

      {/* Categories */}
      <div className="flex space-x-4 mb-4">
        {categories.map(({ name, emoji }) => (
          <label key={name} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(name)}
              onChange={() => handleCategoryClick(name)}
              className="hidden"
            />
            <div
              className={`border rounded-lg px-4 py-2 ${
                selectedCategories.includes(name) ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {emoji} {name}
            </div>
          </label>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 w-[600px]">
        {tags.map(({ name }) => (
          <button
            key={name}
            onClick={() => handleTagClick(name)}
            className={`px-3 py-2 rounded-lg border ${
              selectedTags.includes(name)
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Continue Button (Always Black) */}
      <div className="mt-6 flex items-center space-x-2">
        <button
          onClick={handleContinue}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-900 transition"
        >
          Continue
        </button>
        <span className="text-gray-500">press Enter ↵</span>
      </div>
    </div>
  );
}
