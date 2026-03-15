import React, { useState, useEffect, useRef } from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import CandidateMiddleInformation from "./CandidateMiddleInformation";
import Details from "./Details";
import CardFooter from "./CardFooter";
import Arrow from "./Arrow";
import { motion, AnimatePresence } from "framer-motion";

function CandidateCard({
  candidate,
  candKey,
  jobs,
  company_accounts,
  icons,
  updateCandidate,
  deleteCandidate,
  handleViewDetails,
}) {
  const [display_i, setDisplay_i] = useState(1);
  const [t_jobs, setT_jobs] = useState(0);
  const related_jobs_keys = candidate["job id"] || [];

  useEffect(() => {
    setT_jobs(related_jobs_keys.length);
    // Initialize display_i to 1 when jobs change
    if (related_jobs_keys.length > 0) {
      setDisplay_i(1);
    }
  }, [candidate, related_jobs_keys.length]);

  const handleNavCompany = (dir) => {
    const target = document.getElementById(`${candKey}_${display_i - 1}`);
    if (dir === "left") {
      if (display_i <= 1) {
        setDisplay_i(t_jobs);
      } else {
        setDisplay_i(display_i - 1);
        target.style.translate("-50px");
      }
    } else if (dir === "right") {
      if (display_i >= t_jobs) {
        setDisplay_i(1);
      } else {
        setDisplay_i(display_i + 1);
      }
    }
  };

  const isPending = candidate.status === "Pending";
  const isInterviewed = candidate.status === "Interviewed";
  const isAccepted = candidate.status === "Accepted";
  const isRejected = candidate.status === "Rejected";

  let bg = "";
  if (isPending) bg = "bg-gold_lighter text-Darkgold";
  if (isInterviewed) bg = "bg-blue-hover text-blue-dark";
  if (isAccepted) bg = "bg-light_green text-green-dark";
  if (isRejected) bg = "bg-red-light text-red-dark";

  const job_key = related_jobs_keys[display_i - 1];
  const currentJob = jobs[job_key];
  const companyId = currentJob ? currentJob["company id"] : null;
  const company = companyId ? company_accounts?.[companyId] : null;

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 p-4 rounded-small bg-white">
      <div className="w-full flex flex-row items-center justify-start gap-4">
        <NameInitials name={candidate.name} bg="5629dc" />
        <div className="flex flex-col items-start justify-start">
          <Label text={candidate.name} class_name="text-sm font-medium" />
          <span className="text-xs text-gray-500 flex flex-row items-center justify-start">
            <Icon icon={icons.location} class_name={""} />
            <Label text={candidate.location} />
          </span>
        </div>
        <Label
          text={candidate["offer status"]}
          class_name={`font-lighter text-xs py-1 px-2 rounded-full ml-auto ${bg}`}
        />
      </div>

      <div className="w-full relative h-fit">
        <div className="flex absolute top-2 right-2 flex-row items-center justify-center bg-lighter rounded-small z-10">
          <Arrow
            icon={"ri-arrow-left-s-line"}
            id={"left"}
            onArrowClick={handleNavCompany}
          />
          <span className="text-[8px] px-1">
            {display_i} / {t_jobs}
          </span>
          <Arrow
            icon={"ri-arrow-right-s-line"}
            id={"right"}
            onArrowClick={handleNavCompany}
          />
        </div>
        <div className="w-full overflow-x-auto no-scrollbar h-20 flex flex-row items-center justify-start gap-2 scroll-smooth">
          <AnimatePresence mode="wait">
            {related_jobs_keys?.[display_i - 1] && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
                key={job_key}
                className="translate w-full h-full flex shrink-0"
              >
                <CandidateMiddleInformation
                  icons={icons}
                  handleViewDetails={handleViewDetails}
                  company={company}
                  handleNavCompany={handleNavCompany}
                  currentJob={currentJob}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Details candidate={candidate} />

      <CardFooter
        icons={icons}
        cand_index={candKey}
        candidate={candidate}
        updateCandidate={updateCandidate}
        deleteCandidate={deleteCandidate}
      />
    </div>
  );
}

export default CandidateCard;
