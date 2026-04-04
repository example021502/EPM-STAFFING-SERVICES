import React, { useState } from "react";
import Label from "../../../common/Label";

/**
 * ReqResBen component - Displays job requirements, responsibilities, and benefits
 * @param {Object} props - Component props
 * @param {Object} props.currentJob - Current job data with requirements, responsibilities, and benefits
 * @returns {JSX.Element} Rendered requirements, responsibilities, and benefits component
 */
function ReqResBen({ currentJob = {} }) {
  // Get job requirements with fallback to empty array
  const requirements = Array.isArray(currentJob?.requirements)
    ? [...currentJob?.requirements]
    : [];
  // Get job responsibilities with fallback to empty array
  const responsibilities = Array.isArray(currentJob?.responsibilities)
    ? [...currentJob?.responsibilities]
    : [];
  // State for job benefits with fallback to empty array
  const benefits = Array.isArray(currentJob?.benefits)
    ? [...currentJob?.benefits]
    : [];

  return (
    <div className="w-full gap-8 flex flex-col justify-start text-sm">
      {/* Requirements section */}
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text={"Requirements"}
          class_name={"font-semibold pb-2 px-2 border-b border-lighter"}
        />
        {requirements.map((req, i) => {
          return Object.entries(req).map(([key, value]) => (
            <div key={`req-${i}-${key}`} className="w-full flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={value} className="" />
              </div>
            </div>
          ));
        })}
      </div>

      {/* Responsibilities section */}
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text={"Responsibilities"}
          class_name={"font-semibold pb-2 px-2 border-b border-lighter"}
        />
        {responsibilities.map((res, i) => {
          return Object.entries(res).map(([key, value]) => (
            <div key={`res-${i}-${key}`} className="w-full flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={value} className="" />
              </div>
            </div>
          ));
        })}
      </div>

      {/* Benefits section */}
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text={"Benefits & Perks"}
          class_name={"font-semibold pb-2 px-2 border-b border-lighter"}
        />
        {benefits.map((ben, i) => {
          return Object.entries(ben).map(([key, value]) => (
            <div key={`ben-${i}-${key}`} className="w-full flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
                <Label text={value} className="" />
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
}

export default ReqResBen;
