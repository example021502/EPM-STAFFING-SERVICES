import { useState } from "react";

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 7v5l3 3" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
    <circle cx="8" cy="15" r="0.8" fill="currentColor" />
    <circle cx="12" cy="15" r="0.8" fill="currentColor" />
    <circle cx="16" cy="15" r="0.8" fill="currentColor" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const CompanyCard = () => {
  const [followed, setFollowed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div
        className="bg-white rounded-3xl shadow-md p-6 w-full max-w-md"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #6d28d9)",
              }}
            >
              TCS
            </div>
            {/* Name & Tags */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                Tata Consultancy Services
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  IT Services
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Follow + Positions */}
          <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
            <button
              onClick={() => setFollowed(!followed)}
              className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                followed ? "bg-gray-200 text-gray-700" : "text-white"
              }`}
              style={
                followed
                  ? {}
                  : { background: "linear-gradient(135deg, #f97316, #ea580c)" }
              }
            >
              {followed ? "Following" : "Follow"}
            </button>
            <div className="text-right mt-1">
              <span className="text-2xl font-extrabold text-gray-900">12</span>
              <p className="text-xs text-gray-400 font-medium leading-none">
                Positions
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Active Jobs */}
          <div className="border border-red-100 rounded-2xl p-4 flex items-center justify-between bg-red-50/30">
            <div className="flex items-center gap-2 text-indigo-700">
              <BriefcaseIcon />
              <span className="text-sm font-semibold">Active Jobs</span>
            </div>
            <span className="text-2xl font-extrabold text-gray-800">8</span>
          </div>

          {/* Pending */}
          <div className="border border-red-100 rounded-2xl p-4 flex items-center justify-between bg-red-50/30">
            <div className="flex items-center gap-2 text-indigo-700">
              <ClockIcon />
              <span className="text-sm font-semibold">Pending</span>
            </div>
            <span className="text-2xl font-extrabold text-gray-800">4</span>
          </div>
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between px-1 mb-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MailIcon />
            <span>hr@tc.com</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CalendarIcon />
            <span>Joined Jan 2024</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-2xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            <EyeIcon />
            View Details
          </button>
          <button
            className="rounded-2xl py-3 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};
