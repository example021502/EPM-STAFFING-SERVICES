import React, { useState, useEffect } from "react";
import OTPOverlay from "./OTPOverlay";
import AccountActions from "./AccountActions";
import { showError, showInfo, showSuccess } from "../../../utils/toastUtils";
import { getOTP } from "../../../utils/getOTP";

function MainTop({ logged_user_data, credentials, setCredentials }) {
  const [OTPOverlayOpen, setOTPOverlayOpen] = useState(false);
  const [countDown, setCountDown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  // Handle OTP Verification for Email
  const handleVerifyOTP = (otp) => {
    setIsVerifying(true);
    setTimeout(() => {
      if (otp === generatedOTP) {
        setCredentials((prev) => ({
          ...prev,
          email: tempEmail,
          emailVerified: true,
        }));
        showSuccess("Email verified! Save changes to apply.");
        setOTPOverlayOpen(false);
      } else {
        showError("Invalid OTP");
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleSendOTP = (email) => {
    setTempEmail(email);
    const otp = getOTP();
    setGeneratedOTP(otp);
    showInfo(`Debug OTP: ${otp}`);
    setOTPOverlayOpen(true);
  };

  const handleVerifyPassword = (inputPass, isNewPasswordMode) => {
    if (isNewPasswordMode) {
      // Logic for capturing the NEW password
      setCredentials((prev) => ({
        ...prev,
        password: inputPass,
        passwordVerified: true,
      }));
      showSuccess("New password captured. Click 'Save All' to update.");
    } else {
      // Logic for verifying OLD password
      if (inputPass === logged_user_data.password) {
        showSuccess("Identity verified. Now enter your NEW password.");
        return true; // Tells AccountActions to switch mode
      } else {
        showError("Incorrect current password.");
        return false;
      }
    }
  };

  if (!logged_user_data) return null;

  return (
    <div className="w-full">
      <AccountActions
        onSendOTP={handleSendOTP}
        onVerifyPassword={handleVerifyPassword}
        credentials={credentials}
      />
      <OTPOverlay
        isOpen={OTPOverlayOpen}
        onClose={() => setOTPOverlayOpen(false)}
        email={tempEmail}
        onVerifyOTP={handleVerifyOTP}
        onResendOTP={() => handleSendOTP(tempEmail)}
        countDown={countDown}
        isVerifying={isVerifying}
      />
    </div>
  );
}

export default MainTop;
