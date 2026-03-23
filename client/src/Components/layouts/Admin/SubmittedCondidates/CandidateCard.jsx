import React, { useState, useEffect, useRef, useContext } from "react";
import NameInitials from "../../../common/NameInitials";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";
import CandidateMiddleInformation from "./CandidateMiddleInformation";
import Details from "./Details";
import CardFooter from "./CardFooter";
import Arrow from "./Arrow";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Candidates_context } from "../../../../context/CandidatesContext";
import Button from "../../../common/Button";
import { Jobs_context } from "../../../../context/JobsContext";

/**
 * CandidateCard component - Displays candidate or job information based on route
 * @param {Object} props - Component props
 * @param {Object} props.data - Candidate or job data
 * @param {string} props.data_key - Unique identifier for the data
 * @param {Object} props.jobs - Jobs context data
 * @param {Object} props.company_accounts - Company accounts data
 * @param {Object} props.icons - Icon definitions
 * @param {Function} props.updateCandidate - Function to update candidate data
 * @param {Function} props.deleteCandidate - Function to delete candidate data
 * @param {Function} props.handleViewDetails - Function to handle view details action
 * @returns {JSX.Element} Rendered candidate card component
 */
function CandidateCard({
  data,
  data_key,
  jobs,
  company_accounts,
  icons,
  updateCandidate,
  deleteCandidate,
  handleViewDetails,
}) {
  // Get candidates context for accessing candidate data
  const { candidates } = useContext(Candidates_context);
  // Get jobs context for accessing job data
  const { jobs: jobsContext } = useContext(Jobs_context);
  // Get current route path to determine view mode
  const { pathname } = useLocation();
  // Determine if we're in listed_jobs route
  const section = pathname.split("/").at(-1);
  const isListed_jobs = section === "listed_jobs";

  // State for job navigation index
  const [job_index, set_job_index] = useState(1);
  // State for candidate navigation index
  const [candidate_index, set_candidate_index] = useState(1);
  // State for total job count
  const [t_jobs, setT_jobs] = useState(0);
  // State for total candidate count
  const [t_candidates, setT_candidates] = useState(0);
  // Get related job keys from data
  const related_jobs_keys = data["job id"] || [];

  // Filter candidates related to current job (for listed_jobs view)
  const related_candidates_keys = Object.keys(candidates).filter((key) =>
    candidates[key]?.["job id"]?.includes(data_key),
  );

  // Update counts and indices when data changes
  useEffect(() => {
    // Set count based on view mode
    if (isListed_jobs) {
      setT_candidates(related_candidates_keys?.length);
    } else {
      setT_jobs(related_jobs_keys?.length);
    }
    // Initialize indices to 1 when data is available
    if (related_jobs_keys.length > 0) {
      set_job_index(1);
    }
    if (related_candidates_keys.length > 0) {
      set_candidate_index(1);
    }
  }, [
    data,
    related_jobs_keys?.length,
    related_candidates_keys?.length,
    isListed_jobs,
  ]);

  /**
   * Handle navigation between related items (jobs or candidates)
   * @param {string} dir - Direction of navigation ("left" or "right")
   */
  const handleNavCompany = (dir) => {
    const target = document.getElementById(`${data_key}_${job_index - 1}`);
    if (dir === "left") {
      if (job_index <= 1) {
        set_job_index(t_jobs);
      } else {
        set_job_index(job_index - 1);
        target.style.translate("-50px");
      }
    } else if (dir === "right") {
      if (job_index >= t_jobs) {
        set_job_index(1);
      } else {
        set_job_index(job_index + 1);
      }
    }
  };

  // Determine status styling based on current status
  const isPending = data.status === "Pending";
  const isInterviewed = data.status === "Interviewed";
  const isAccepted = data.status === "Accepted";
  const isRejected = data.status === "Rejected";

  // Set background color and text color based on status
  let bg = "";
  if (isPending) bg = "bg-gold_lighter text-Darkgold";
  if (isInterviewed) bg = "bg-blue-hover text-blue-dark";
  if (isAccepted) bg = "bg-light_green text-green-dark";
  if (isRejected) bg = "bg-red-light text-red-dark";

  // Get current job data for candidate view
  const job_key = related_jobs_keys[job_index - 1];
  const currentJob = jobs[job_key];
  const companyId = currentJob ? currentJob["company id"] : null;
  const company = companyId ? company_accounts?.[companyId] : null;

  // Get current candidate data for job view
  const candidate_key = related_candidates_keys[candidate_index - 1];
  const currentCandidate = candidates[candidate_key];

  // Determine which data item to display based on view mode
  const data_item = isListed_jobs
    ? related_candidates_keys?.[candidate_index - 1]
    : related_jobs_keys?.[job_index - 1];

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 p-4 rounded-small bg-white">
      {/* Top section: Display job info for listed_jobs, candidate info for candidates view */}
      <div className="w-full flex flex-row items-center justify-start gap-4">
        {/* Display name initials based on view mode */}
        <NameInitials
          name={isListed_jobs ? data["job title"] : data.name}
          bg="5629dc"
        />
        <div className="flex flex-col items-start justify-start">
          {/* Display job title for listed_jobs, candidate name for candidates view */}
          <Label
            text={isListed_jobs ? data["job title"] : data.name}
            class_name="text-sm font-medium"
          />
          {/* Display location - job location for listed_jobs, candidate location for candidates view */}
          <span className="text-xs text-gray-500 flex flex-row items-center justify-start">
            <Icon icon={icons.location} class_name={""} />
            <Label text={isListed_jobs ? data.location : data.location} />
          </span>
        </div>
        {/* Display remove button for listed_jobs, status for candidates view */}
        {isListed_jobs ? (
          <Button
            text="Remove"
            class_name="py-1 px-2 rounded-sm border-lighter border shadow-sm shadow-lighter"
          />
        ) : (
          <Label
            text={data["offer status"]}
            class_name={`font-lighter text-xs py-1 px-2 rounded-full ml-auto ${bg}`}
          />
        )}
      </div>

      {/* Middle section: Display candidate info for listed_jobs, company info for candidates view */}
      <div className="w-full relative h-fit">
        <div className="flex absolute top-2 right-2 flex-row items-center justify-center bg-lighter rounded-small z-10">
          <Arrow
            icon={"ri-arrow-left-s-line"}
            id={"left"}
            onArrowClick={handleNavCompany}
          />
          {/* Display count based on view mode */}
          <span className="text-[8px] px-1">
            {isListed_jobs
              ? `${candidate_index} / ${t_candidates}`
              : `${job_index} / ${t_jobs}`}
          </span>
          <Arrow
            icon={"ri-arrow-right-s-line"}
            id={"right"}
            onArrowClick={handleNavCompany}
          />
        </div>
        <div className="w-full overflow-x-auto no-scrollbar h-20 flex flex-row items-center justify-start gap-2 scroll-smooth">
          <AnimatePresence mode="wait">
            {data_item && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
                key={isListed_jobs ? candidate_key : job_key}
                className="translate w-full h-full flex shrink-0"
              >
                <CandidateMiddleInformation
                  icons={icons}
                  handleViewDetails={handleViewDetails}
                  company={isListed_jobs ? company : company}
                  handleNavCompany={handleNavCompany}
                  currentJob={isListed_jobs ? null : currentJob}
                  currentCandidate={isListed_jobs ? currentCandidate : null}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Details section: Display job details for listed_jobs, candidate details for candidates view */}
      <Details data={data} isListed_jobs={isListed_jobs} />

      {/* Footer section: Actions and additional information */}
      <CardFooter
        icons={icons}
        cand_index={data_key}
        data={data}
        updateCandidate={updateCandidate}
        deleteCandidate={deleteCandidate}
        isListed_jobs={isListed_jobs}
      />
    </div>
  );
}

export default CandidateCard;
