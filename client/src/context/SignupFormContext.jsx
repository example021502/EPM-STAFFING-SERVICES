import React, { createContext, useEffect, useState } from "react";
export const signup_form_context = createContext(null);
export const signup_stage_context = createContext(null);

function SignupFormContext({ children }) {
  const data = {
    email: "",
    password: "",
    "confirm password": "",
    "company name": "",
    "industry type": "",
    "registration number": "",
    description: "",
    "mobile number": "",
    "contact information": [],
    address: "",
    city: "",
    state: "",
    "pin code": "",
    terms: false,
  };

  const [stage, setStage] = useState(() => {
    try {
      const saved = sessionStorage.getItem("signup_stage");
      return saved ? JSON.parse(saved) : ["signup_form"];
    } catch (error) {
      console.warn("Error parsing saved stage data:", error);
      return ["signup_form"];
    }
  });

  const [form, setForm] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("signup_form"));
      return saved
        ? typeof saved === "string"
          ? JSON.parse(saved)
          : saved
        : data;
    } catch (error) {
      console.warn("Error parsing saved form data:", error);
      return data;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("signup_stage", JSON.stringify(stage));
    } catch (error) {
      console.warn("Error saving stage data:", error);
    }
  }, [stage]);

  useEffect(() => {
    try {
      const string = JSON.stringify(form);
      sessionStorage.setItem("signup_form", string);
    } catch (error) {
      console.warn("Error saving form data:", error);
    }
  }, [form]);

  const clearForm = () => {
    setForm(data);
    sessionStorage.removeItem("signup_form");
  };

  return (
    <signup_stage_context.Provider value={{ stage, setStage }}>
      <signup_form_context.Provider value={{ form, setForm, clearForm }}>
        {children}
      </signup_form_context.Provider>
    </signup_stage_context.Provider>
  );
}

export default SignupFormContext;
