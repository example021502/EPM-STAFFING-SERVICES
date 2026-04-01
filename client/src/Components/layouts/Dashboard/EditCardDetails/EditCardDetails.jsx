import React, { useContext, useState } from "react";
import Label from "../../../common/Label";
import LabelInput from "../../../common/LabelInput";
import UrgentJob from "./UrgentJob";
import Button from "../../../common/Button";
import EditComponentAnchor from "./EditJobComponentAnchor";
import RequirementsEditComponent from "./RequirementsEditComponent";
import JobStatus from "./JobStatus";
import { Jobs_context } from "../../../../context/JobsContext";
import Header from "../Candidate/Common/Header";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess } from "../../../../utils/toastUtils";

import {
  updateByColumnNameIdService,
  updateByIdService,
} from "../../../../utils/server_until/service";

function EditCardDetails({ setEditJobPost, card, card_index }) {
  const { updateJob } = useContext(Jobs_context);

  const [newForm_data, setNewForm_data] = useState(() => {
    const parseField = (value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      }
      return value ?? [];
    };

    return {
      ...card,
      requirements: parseField(card.requirements),
      responsibilities: parseField(card.responsibilities),
      benefits: parseField(card.benefits),
    };
  });

  const [isSaving, setIsSaving] = useState(false);

  if (!card) {
    return null;
  }

  const handle_update_form = (value, id) => {
    setNewForm_data((prev) => {
      const isStatus = id === "status";
      const val = isStatus ? (value === false ? "InActive" : "Active") : value;
      return { ...prev, [id]: val };
    });
  };

  const updateReq_Res_Ben = (value, id) => {
    const [index, section] = id.split(":");
    const idx = parseInt(index);
    setNewForm_data((prev) => {
      const updatedList = [...prev[section]];
      updatedList[idx] = value;
      return { ...prev, [section]: updatedList };
    });
  };

  const deletingReq_Res_Ben = (section, index) => {
    setNewForm_data((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addingReq_Res_Ben = (section) => {
    setNewForm_data((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), ""],
    }));
  };

  const handleSaveChanges = async () => {
    if (isSaving) return; // ✅ Prevent duplicate clicks
    setIsSaving(true);

    // Handling form superbase timestamp
    const toSupabaseTimestamp = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      if (isNaN(date)) return null;
      return date.toISOString();
    };

    const toActive = (data) => {
      if (data == "Active") {
        return true;
      } else return false;
    };

    const readyJobs = {
      active: toActive(newForm_data.status),
      urgent: newForm_data.priority,
      job_name: newForm_data["job title"],
      job_type: newForm_data.job_type,
      salary_min:
        newForm_data.salary_min ?? // updated via input
        newForm_data.salary?.split("-")[0]?.trim() ?? // fallback: parse from original
        null,
      salary_max:
        newForm_data.salary_max ?? // updated via input
        newForm_data.salary?.split("-")[1]?.trim() ?? // fallback: parse from original
        null,
      experience_years: newForm_data.experience,
      max_applications: Number(newForm_data["max applications"]), // ensure number not string
      deadline: toSupabaseTimestamp(newForm_data.deadline),
      description: newForm_data.description,
      location: newForm_data.location,
    };

    try {
      await updateByIdService(
        "api/dr/update/id",
        readyJobs,
        "jobs",
        newForm_data.id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { requirements: { ...newForm_data.requirements } },
        "job_requirements",
        "job_id",
        newForm_data.id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { responsibilities: { ...newForm_data.responsibilities } },
        "job_responsibilities",
        "job_id",
        newForm_data.id,
      );

      await updateByColumnNameIdService(
        "api/dr/update/id",
        { benefits: { ...newForm_data.benefits } },
        "job_benefits",
        "job_id",
        newForm_data.id,
      );

      showSuccess("Job updated successfully!");
      setEditJobPost(false); // ✅ Close overlay on success
    } catch (error) {
      console.error("Failed to save job:", error);
    } finally {
      setIsSaving(false); // ✅ Always re-enable button (on success or error)
    }
  };

  const icon_class =
    "font-semibold text-sm rounded-full hover:text-red transition-all ease-in-out duration-200 hover:border border-red_light w-6 h-6 p-2";
  const input_class_name =
    "border border-light/60 w-full p-2 placeholder-text_b rounded-small focus:outline-none focus:ring-1 ring-nevy_blue";
  const label_class_name = "font-semibold text-sm";

  const sections = [
    { id: "requirements", label: "Requirements", button: "+ Add requirement" },
    {
      id: "responsibilities",
      label: "Responsibilities",
      button: "+ Add responsibility",
    },
    { id: "benefits", label: "Benefits & Perks", button: "+ Add benefit" },
  ];

  const display_text =
    card.status === "Active"
      ? "This job is active and candidates can apply. Applications will be reviewed by the hiring team."
      : `This job has been ${card.status}`;

  return (
    <AnimatePresence>
      <div
        onClick={() => setEditJobPost(false)}
        className="flex items-center text-sm justify-center p-4 absolute overflow-hidden top-0 left-0 w-full h-full bg-light_black z-50"
      >
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, type: "tween" }}
          onClick={(e) => e.stopPropagation()}
          className="h-full w-[40%] overflow-hidden rounded-small shadow-xl flex flex-col bg-white"
        >
          <Header
            heading={card["job title"]}
            candidate_name={"Edit Job Post"}
            handleClosingModal={() => setEditJobPost(false)}
          />
          <div className="flex overflow-y-auto no-scrollbar overflow-x-hidden gap-6 p-4 flex-col items-start justify-between w-full flex-1">
            <JobStatus
              card={card}
              handle_update_form={handle_update_form}
              heading={card.status}
              label={display_text}
            />

            <LabelInput
              onchange={handle_update_form}
              id="job title"
              text="Job Title"
              default_value={card["job title"]}
              label_class_name={label_class_name}
              input_class_name={input_class_name}
              type="text"
            />

            <UrgentJob
              heading="Mark as Urgent"
              label="This will assign a priority badge to your listing"
              priority={card.priority}
              handle_update_form={handle_update_form}
            />

            <EditComponentAnchor
              card={card}
              handleInputChange={handle_update_form}
            />

            {sections.map((section) => (
              <div
                key={section.id}
                className="gap-1 w-full flex flex-col items-start justify-start"
              >
                <Label
                  text={section.label}
                  class_name={`border-b border-lighter pb-1 mb-2 w-full ${label_class_name}`}
                />
                <RequirementsEditComponent
                  id={section.id}
                  icon_class={icon_class}
                  data_prop={newForm_data[section.id] || []}
                  button={section.button}
                  updateReq_Res_Ben={updateReq_Res_Ben}
                  deletingReq_Res_Ben={deletingReq_Res_Ben}
                  addingReq_Res_Ben={() => addingReq_Res_Ben(section.id)}
                />
              </div>
            ))}

            {/* Disabled + dimmed while saving */}
            <Button
              text={isSaving ? "Saving..." : "Save Changes"}
              onclick={handleSaveChanges}
              class_name={`py-2 w-full text-center rounded-small bg-g_btn text-text_white transition-opacity duration-200 ${
                isSaving
                  ? "opacity-60 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default EditCardDetails;
