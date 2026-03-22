import React, { useContext, useRef, useState } from "react";
import Label from "../../../common/Label";
import CandidatesContainer from "../SubmittedCondidates/CandidatesContainer";
import { Jobs_context } from "../../../../context/JobsContext";
import { grid_list_context } from "../../../../context/GridListViewContext";
import Common_Client_Management_Searching_And_View from "../AdminClientManagement/Common_Client_Management_Searching_And_View";

function ListedJobs() {
  const { jobs } = useContext(Jobs_context);
  const { searchKey, setSearchKey } = useState("");
  const { view, setView } = useContext(grid_list_context);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef();
  const handleSearchChange = (value, id) => {
    setSearchKey(value);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScroll = () => {
      setScrolled(container.scrollTop > 20);
    };

    container.addEventListener("scroll", updateScroll);
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-start justify-start overflow-y-auto no-scrollbar p-4"
    >
      <Common_Client_Management_Searching_And_View
        scrolled={scrolled}
        onSearchChange={handleSearchChange}
      />

      {/* {Object.keys(filterdCandidates).length === 0 ? (
        <div className="w-full h-40 flex items-center justify-center">
          <Label text={"No candidates found"} class_name={"text-gray-500"} />
        </div>
      ) : (
        <CandidatesContainer
          filterdCandidates={filterdCandidates}
          updateCandidate={updateCandidate}
          deleteCandidate={deleteCandidate}
        />
      )} */}
    </div>
  );
}

export default ListedJobs;
