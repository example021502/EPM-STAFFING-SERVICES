import React, { useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError, showSuccess } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import OTPOverlay from "../Settings/OTPOverlay";
import { sendOTP, verifyOTP } from "../../../services/otp.service";
import { updateByIdService } from "../../../utils/server_until/service.js";
import {
  createAccount,
  getUserByEmail,
} from "../../../services/user.service.js";

function Signup_Account_credentials() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [otp_overlay, setOtp_overlay] = useState(false);
  const [verify_id, setVerify_id] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resendKey, setResendKey] = useState(0);

  const navigate = useNavigate();

  const elements = [
    {
      type: "new-password",
      placeholder: "Enter email here...",
      label: "Email*",
      id: "email",
    },
    {
      type: "password",
      placeholder: "Create a Strong Password",
      label: "Password*",
      id: "password",
    },
    {
      type: "confirm password",
      placeholder: "Confirm your Password",
      label: "Confirm Password*",
      id: "confirm_password",
    },
  ];

  const handleInputChange = (value, id) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateOtp = async () => {
    try {
      const result = await sendOTP(form.email);

      if (!result.success) {
        return showError(result.message || "Failed to send OTP");
      }

      console.log(result);

      setVerify_id(result.data);
      setResendKey((prev) => prev + 1);
      setOtp_overlay(true);
      showSuccess("OTP sent successfully!");
    } catch (err) {
      console.log(err);
      showError("Something went wrong while sending OTP!");
    } finally {
      setIsLoading(false);
    }
  };

  // FIX 4 & 5: Handle all signup_stage cases explicitly; never fall through to createAccount for existing users
  const handleVerifyOtp = async (otp_code) => {
    try {
      setVerifying(true);

      const otpRes = await verifyOTP(verify_id, otp_code);

      if (!otpRes.success) {
        return showError(otpRes.message || "Invalid OTP");
      }

      showSuccess("OTP verified successfully!");
      setOtp_overlay(false);

      // Check if user already exists
      let existingUser = null;
      try {
        const user = await getUserByEmail(form.email);
        if (user.success) existingUser = user.data;
      } catch {
        // User not found — this is expected for new signups, continue below
      }

      if (existingUser) {
        const stage = existingUser.signup_stage;

        if (stage === "completed") {
          return showError(
            "This account is already registered. Please log in.",
          );
        }

        // Route existing incomplete signups to the correct step
        if (stage === "1" || stage === "2") {
          return navigate("/auth/signup_form/company_information");
        }
        if (stage === "3") {
          return navigate("/auth/signup_form/contact_information");
        }
        if (stage === "4") {
          return navigate("/auth/signup_form/address_information");
        }

        // FIX 4: Unknown stage — don't fall through; show a clear error
        return showError("Unexpected account state. Please contact support.");
      }

      // New user — create account
      const response = await createAccount({
        email: form.email,
        password: form.confirm_password,
      });

      if (!response.success) {
        return showError(response.message || "Failed to create account");
      }

      await updateByIdService(
        { signup_stage: "2" },
        "api/users/update/users/id",
        response.data.id,
      );

      showSuccess("Account created successfully!");
      navigate("/auth/signup_form/company_information");
    } catch (err) {
      console.log(err);
      showError("Verification failed! Please try again.");
    } finally {
      setVerifying(false);
      setIsLoading(false);
    }
  };

  // FIX 1, 2 & 3: Validate email first + add format check + handle "user not found" safely
  const handleNavigation = async () => {
    // FIX 1: Validate email before password fields
    if (form.email === "") return showError("Email is required!");

    // FIX 2: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return showError("Please enter a valid email address!");

    if (form.password === "") return showError("Password is required!");
    if (form.password.length < 5)
      return showError("Password must be at least 5 characters");
    if (!/^[A-Z]/.test(form.password))
      return showError("Password must start with a capital letter");
    if (!/\d/.test(form.password))
      return showError("Password must contain at least 1 digit");
    if (form.confirm_password === "")
      return showError("Please confirm your password!");
    if (form.password !== form.confirm_password)
      return showError("Passwords do not match!");

    setIsLoading(true);

    try {
      // FIX 3: Wrap getUserByEmail in try/catch so "not found" doesn't crash the flow
      let existingUser = null;
      try {
        const user = await getUserByEmail(form.email);
        if (user.success) existingUser = user.data;
      } catch {
        // User doesn't exist — perfectly fine for new signup
      }

      if (existingUser && existingUser.signup_stage === "completed") {
        setIsLoading(false);
        return showError("This email is already registered. Please log in.");
      }

      await handleGenerateOtp();
    } catch (err) {
      console.log(err);
      showError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const label_style = "text-sm font-medium text-gray-600 text-start";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <>
      <header className="w-full flex flex-col gap-2 pt-4 bg-b_white z-20 sticky top-0 items-center">
        <Label
          text="Address Details"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label text={"Complete your registration"} class_name={label_style} />
      </header>

      <div className="flex flex-col items-center justify-start gap-4 w-full p-2 text-sm">
        {elements.map((el) => (
          <div key={el.id} className="w-full flex flex-col space-y-1">
            <Label text={el.label} class_name={label_style} />
            <Input
              autoComplete="off"
              onchange={handleInputChange}
              type={el.type}
              id={el.id}
              placeholder={el.placeholder}
              class_name={input_style}
            />
          </div>
        ))}

        <button
          onClick={handleNavigation}
          disabled={isLoading}
          className={`flex flex-row items-center text-lg py-1.5 font-semibold cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small bg-g_btn text-text_white justify-center space-x-1 w-full
            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          <Label text={isLoading ? "Loading..." : "Continue"} />
          <Icon icon={"ri-arrow-right-line"} />
        </button>
      </div>

      <Already_have_account />

      <OTPOverlay
        key={resendKey}
        isOpen={otp_overlay}
        email={form.email}
        onVerifyOTP={handleVerifyOtp}
        onResendOTP={handleGenerateOtp}
        isVerifying={verifying}
        onClose={() => {
          setOtp_overlay(false);
          setIsLoading(false);
        }}
      />
    </>
  );
}

export default Signup_Account_credentials;
