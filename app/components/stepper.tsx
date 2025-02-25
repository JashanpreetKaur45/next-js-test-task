const Stepper = ({ step }: { step: number }) => {
    const steps = ["Name", "Preferences", "Organization", "Education", "Submit"];
  
    return (
      <div className="flex space-x-6 mb-6">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                index + 1 <= step ? "bg-black text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-sm ${index + 1 <= step ? "font-semibold" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  export default Stepper;
  