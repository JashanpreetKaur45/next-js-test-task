"use client";
import Image from "next/image";

export default function WelcomePage({ params }: { params: { name: string } }) {
  return <EmailTemplate name={params.name} />;
}

function EmailTemplate({ name }: { name: string }) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-center items-center">
        <Image src="/logo.png" alt="Paths Logo" width={120} height={50} />
      </div>
      <p className="text-gray-500 text-sm text-center mt-2">Friday, 23rd Feb 2024</p>

      {/* Welcome Section */}
      <h1 className="text-2xl font-bold mt-4 text-center">Welcome!</h1>

      {/* Dynamic User Name */}
      <p className="mt-4 text-gray-800 text-left">Hi <span className="font-semibold">{name}</span>,</p>

      {/* Introduction */}
      <p className="mt-4 text-gray-700 text-left">
        I’m Reed, an Executive MBA (Finance), class of 2024.
      </p>
      <p className="mt-4 text-gray-700 text-left">
        If there’s one thing I learned during my studies, it’s that academic frameworks and theories 
        are only as powerful as the experience you get applying them to real-world projects.
      </p>
      <p className="mt-4 text-gray-700 text-left">
        But let’s face it—short-term projects aren’t always easy to find, and not all courses include 
        consulting projects. Even when they do, they rarely align neatly with your career interests or goals.
      </p>

      <p className="mt-4 text-gray-700 text-left">
        That’s why we created <span className="font-bold">Paths</span>—a community of students, graduates, professors, 
        investors, nonprofits, and business leaders, all looking to collaborate on projects that truly matter.
      </p>

      <p className="mt-4 text-gray-700 text-left">
        We believe the right project can be the first falling domino—the catalyst that sets bigger opportunities in motion. 
        Through flexible, short-term projects (typically 3 to 12 hours), we’ve already helped companies and nonprofits achieve 
        major milestones—
      </p>

      {/* Features List */}
      <ul className="mt-4 space-y-2 text-left">
        {[
          "✅ Successful Go-To-Market Strategies 🛫",
          "✅ Insightful Competitor Analysis 🤺",
          "✅ New Customer Segmentation Discoveries 👨‍👩‍👧‍👦",
          "✅ Raising capital for mission-driven startups💰",
          "✅ Completing M&A transactions 🤝",
          "✅ Developing sales & marketing strategies 📈",
          "✅ Building dynamic financial models 📊",
          "✅ ... and so much more.",
        ].map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>

      {/* Call to Action */}
      <p className="mt-4 text-gray-700 text-left">
        Make sure to visit our website regularly for new projects and to keep up to date 
        with insights and stories from our growing community.
      </p>

      {/* Footer */}
      <p className="mt-6 text-gray-600 text-left">Best,</p>
      <p className="font-semibold text-gray-800 text-left">Reed Langridge</p>
      <p className="text-blue-500 underline cursor-pointer text-left">www.inpaths.com</p>
    </div>
  );
}
