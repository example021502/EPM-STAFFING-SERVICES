import { useEffect, useContext, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Label from "../../common/Label";
import { signup_stage_context } from "../../../context/SignupFormContext";

function Signup_form() {
  const { pathname } = useLocation();
  const { stage, setStage } = useContext(signup_stage_context);
  const name = pathname.split("/").at(-1);

  // Loading state management
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState("forward");
  const prevPathnameRef = useRef(pathname);
  const timeoutRef = useRef(null);

  // Determine navigation direction
  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    const currentPath = pathname;

    // Determine if navigating forward or backward
    const sections = [
      "signup_form",
      "contact_information",
      "address_information",
      "account_credentials",
    ];
    const prevIndex = sections.indexOf(prevPathname.split("/").pop());
    const currentIndex = sections.indexOf(currentPath.split("/").pop());

    if (prevIndex < currentIndex) {
      setDirection("forward");
    } else if (prevIndex > currentIndex) {
      setDirection("backward");
    } else {
      setDirection("forward"); // Default to forward for same level navigation
    }

    prevPathnameRef.current = currentPath;
  }, [pathname]);

  // Handle loading state with smooth transitions
  useEffect(() => {
    // Set loading state when pathname changes
    setIsLoading(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Update stage after a brief delay to allow loading animation
    timeoutRef.current = setTimeout(() => {
      const sections = [
        "signup_form",
        "contact_information",
        "address_information",
        "account_credentials",
      ];
      const currentIndex = sections.indexOf(name);
      const currentStageIndex = stage.indexOf(name);

      let newArr;
      if (currentStageIndex === -1) {
        // Forward navigation - add new stage
        newArr = [...stage, name];
      } else if (currentStageIndex < stage.length - 1) {
        // Backward navigation - truncate to current stage
        newArr = stage.slice(0, currentStageIndex + 1);
      } else {
        // Already at this stage
        newArr = stage;
      }

      setStage(newArr);

      // End loading after stage update
      setTimeout(() => {
        setIsLoading(false);
      }, 100); // Small delay for smooth transition
    }, 200); // Loading duration

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [name, stage, setStage]);

  const section_visuals = [
    { label: 1, info: "Company Info", id: "signup_form" },
    { label: 2, info: "Contact Info", id: "contact_information" },
    { label: 3, info: "Address", id: "address_information" },
    { label: 4, info: "Setting Password", id: "account_credentials" },
  ];

  const form_style =
    "w-full max-w-[40%] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4 relative overflow-hidden";

  return (
    <div className={`overflow-y-auto no-scrollbar ${form_style}`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div
          className={`absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 ${
            direction === "forward" ? "animate-slide-up" : "animate-slide-down"
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-nevy_blue/20 border-t-nevy_blue rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-12 h-12 border-4 border-nevy_blue/20 border-b-nevy_blue rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <Label
              text="Loading next step..."
              class_name="text-sm text-gray-600 font-medium"
            />
          </div>
        </div>
      )}

      {/* Progress Header */}
      <div className="w-full bg-b_white sticky z-200 top-0 text-xs flex flex-row items-center justify-between transition-all duration-300">
        {section_visuals.map((visual, i) => {
          const isActive = stage.includes(visual.id);
          const isCompleted =
            i < section_visuals.findIndex((v) => v.id === name) || isActive;

          return (
            <div
              key={visual.label}
              className={`flex border-b-6 gap-1 pb-3 w-full flex-col items-center justify-center transition-all duration-300 ${
                isActive || isCompleted
                  ? "border-red text-red"
                  : "border-light/60 text-gray-400"
              }`}
            >
              <div
                className={`relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
                  isActive || isCompleted
                    ? "bg-red text-text_white shadow-lg shadow-red/20"
                    : "bg-light/60 text-gray-400"
                }`}
              >
                {isCompleted && !isActive ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  visual.label
                )}
              </div>
              <Label
                text={visual.info}
                class_name={`transition-all duration-300 ${
                  isActive || isCompleted ? "font-semibold" : "font-normal"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Form Content with Transition */}
      <div
        className={`transition-all duration-400 ${
          isLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <Outlet />
      </div>

      {/* Navigation Direction Indicators (Optional subtle hints) */}
    </div>
  );
}

export default Signup_form;
