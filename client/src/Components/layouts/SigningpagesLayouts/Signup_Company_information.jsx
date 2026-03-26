import React, { useEffect, useRef, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import SelectComponent from "./SelectComponent";
import Icon from "../../common/Icon";
import Already_have_account from "./Already_have_account";
import { showError } from "../../../utils/toastUtils";
import TextArea from "../../common/TextArea";
import { useNavigate, Link } from "react-router-dom";

function Signup_Company_information() {
  // account information form
  const [form, setForm] = useState({
    company_name: "",
    industry_type: "",
    registration_number: "",
    description: "",
  });
  const [expand, setExpand] = useState(false);
  const target_containerRef = useRef();
  const navigate = useNavigate();

  // use effect for the industry type field
  useEffect(() => {
    const target_ref = target_containerRef.current;
    if (!target_ref) return;
    const updateClicking = (e) => {
      if (!target_ref.contains(e.target)) setExpand(false);
    };

    // click event for industry type field clicking
    window.addEventListener("mousedown", updateClicking);
    return () => window.removeEventListener("mousedown", updateClicking);
  }, []);

  // form elements
  const elements = [
    {
      type: "text",
      placeholder: "Enter company name",
      label: "Company name*",
      id: "company_name",
    },
    {
      type: "select",
      placeholder: "Select industry type",
      label: "Industry Type*",
      id: "industry_type",
    },
    {
      type: "text",
      placeholder: "Enter company registration number",
      label: "Registration Number*",
      id: "registration_number",
    },
    {
      type: "textarea",
      placeholder: "Tell us about your company",
      label: "Description (optional)",
      id: "description",
    },
  ];

  // handling form filling
  const handleInputChange = (value, id) =>
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));

  // controlling the expanding of industry type field
  const handleClicking = () => setExpand((prev) => !prev);

  // handling next form and back navigation buttons
  const handleNextForm = (name) => {
    if (name === "back") return navigate("/auth/signup_form/");
    const isEmpty = Object.keys(form).filter(
      (key) => key !== "description" && form[key] === "",
    );
    if (isEmpty.length > 0) {
      return showError(`Fill ${isEmpty.join(", ")} to continue!`);
    }

    // navigating to contact information form
    navigate("/auth/signup_form/contact_information");
  };

  //navigation buttons
  const buttons = [
    { label: "Back", id: "back", icon: "ri-arrow-left-line" },
    { label: "Continue", id: "continue", icon: "ri-arrow-right-line" },
  ];

  // styles
  const label_style = "text-sm font-medium text-gray-600 text-center";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <>
      {/* company information header */}
      <header className="w-full flex flex-col gap-2">
        <Label
          text="Create Account"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label
          text={"Provide details about your company"}
          class_name={label_style}
        />
      </header>

      {/* company information: fields container */}
      <div className="flex flex-col items-center justify-start gap-4 w-full text-sm">
        {elements.map((el) => (
          <div
            key={el.id}
            className="w-full flex flex-col items-start justify-start space-y-1"
          >
            <Label text={el.label} class_name={label_style} />
            {el.type === "select" ? (
              // industry type field component
              <div
                onClick={handleClicking}
                ref={target_containerRef}
                className="relative w-full rounded-small"
              >
                <span
                  onClick={handleClicking}
                  className={`absolute right-2 z-1 top-0 bottom-0 my-auto h-5 w-5 flex items-center justify-center text-md transition-all duration-150 ease-in-out ${expand ? "rotate-180" : ""}`}
                >
                  <Icon icon={"ri-arrow-down-s-line"} />
                </span>

                <Input
                  type={el.type}
                  read_only={true}
                  id={el.id}
                  onchange={handleInputChange}
                  placeholder={el.placeholder}
                  class_name={`cursor-pointer z-2 ${input_style}`}
                  value={form["industry_type"]}
                />

                {/* industry type elements */}
                {expand && (
                  <SelectComponent
                    toggleExpand={handleClicking}
                    handleSelecting={handleInputChange}
                  />
                )}
              </div>
            ) : el.type === "textarea" ? (
              // Optional company description field
              <TextArea
                id={el.id}
                onchange={handleInputChange}
                placeholder={el.placeholder}
                class_name={`min-h-20 ${input_style}`}
              />
            ) : (
              // Other company information information
              <Input
                id={el.id}
                onchange={handleInputChange}
                placeholder={el.placeholder}
                class_name={input_style}
              />
            )}
          </div>
        ))}

        <div className="w-full grid grid-cols-2 gap-2 items-center justify-center mb-0">
          {buttons.map((button) => {
            const isBack = button.label === "Back";
            return (
              <div
                key={button.id}
                onClick={() => handleNextForm(button.id)}
                className={`flex flex-row items-center py-1 cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small ${isBack ? "bg-white text-nevy_blue border border-nevy_blue" : "bg-g_btn flex-row-reverse text-text_white"} justify-center space-x-1 w-full`}
              >
                <Icon icon={button.icon} class_name="" />
                <Label text={button.label} class_name={""} />
              </div>
            );
          })}
        </div>
      </div>

      <Already_have_account />
    </>
  );
}

export default Signup_Company_information;
