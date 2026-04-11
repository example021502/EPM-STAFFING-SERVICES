import React, { useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { showError, showWarning } from "../../../utils/toastUtils";

function AccountActions({ onSendOTP, onVerifyPassword, credentials }) {
  const [localEmail, setLocalEmail] = useState("");
  const [localPass, setLocalPass] = useState("");
  const [isChangeMode, setIsChangeMode] = useState(false);

  const handleAction = (type) => {
    if (type === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail))
        return showError("Invalid email");
      onSendOTP(localEmail);
    } else {
      if (!localPass) return showWarning("Field cannot be empty");

      if (!isChangeMode) {
        // Mode: Verifying current password
        const success = onVerifyPassword(localPass, false);
        if (success) {
          setIsChangeMode(true);
          setLocalPass(""); // Clear field for the new password
        }
      } else {
        // Mode: Entering new password
        onVerifyPassword(localPass, true);
      }
    }
  };

  return (
    <div className="w-full rounded-small border border-lighter shadow-sm flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Email Section */}
      <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-lighter">
        <Label text="Update Email" class_name="font-medium mb-1 block" />
        <div className="relative">
          <Input
            placeholder="New email address"
            onchange={(val) => setLocalEmail(val)}
            value={localEmail}
            class_name="w-full pr-24"
          />
          <button
            onClick={() => handleAction("email")}
            className="absolute right-1 top-1 bottom-1 px-3 bg-highlightBackground text-xs rounded-small"
          >
            {credentials.emailVerified ? "Verified ✓" : "Send OTP"}
          </button>
        </div>
      </div>

      {/* Password Section */}
      <div className="flex-1 p-4">
        <Label
          text={
            isChangeMode ? "Enter New Password" : "Confirm Current Password"
          }
          class_name="font-medium mb-1 block text-blue"
        />
        <div className="relative">
          <Input
            type="password"
            placeholder={
              isChangeMode ? "Type new password" : "Type current password"
            }
            onchange={(val) => setLocalPass(val)}
            value={localPass}
            class_name="w-full pr-32"
          />
          <button
            onClick={() => handleAction("password")}
            className={`absolute right-1 top-1 bottom-1 px-3 text-xs rounded-small ${isChangeMode ? "bg-green-500 text-white" : "bg-highlightBackground"}`}
          >
            {isChangeMode
              ? credentials.passwordVerified
                ? "Ready ✓"
                : "Confirm New"
              : "Verify Identity"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountActions;
