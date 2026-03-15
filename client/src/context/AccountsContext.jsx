import React, { createContext, useState, useEffect, useMemo } from "react";
import { showSuccess } from "../utils/toastUtils";

export const Company_context = createContext(null);

function CompanyProvider({ children }) {
  // Initialize state by parsing the string from sessionStorage
  const [company_accounts, setCompany_accounts] = useState(() => {
    const saved = sessionStorage.getItem("company_accounts");
    if (!saved) return {};
    try {
      const parsed = JSON.parse(saved);
      if (typeof parsed === "string") return JSON.parse(parsed);
      return parsed;
    } catch (e) {
      console.log("failed to parse company_accounts, ", e);
      return {};
    }
  });

  // Keep sessionStorage in sync whenever the 'company_accounts' state changes
  useEffect(() => {
    if (company_accounts && typeof company_accounts === "object") {
      sessionStorage.setItem(
        "company_accounts",
        JSON.stringify(company_accounts),
      );
    }
  }, [company_accounts]);

  const update_company_info = (comp_id, updated_comp) => {
    setCompany_accounts((prev) => ({ ...prev, [comp_id]: updated_comp }));
    showSuccess("Changes saved successfully!");
  };

  const save_company_accounts = (accounts) => setCompany_accounts(accounts);

  // Toggle follow status
  const toggleFollowStatus = (companyId) => {
    setCompany_accounts((prevAccounts) => ({
      ...prevAccounts,
      [companyId]: {
        ...prevAccounts[companyId],
        "follow status": !prevAccounts[companyId]["follow status"],
      },
    }));
  };

  return (
    <Company_context.Provider
      value={{
        // Data access methods
        company_accounts,
        save_company_accounts,
        toggleFollowStatus,
        update_company_info,
      }}
    >
      {children}
    </Company_context.Provider>
  );
}

export default CompanyProvider;
