import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import Label from "../Components/common/Label";
import MainTop from "../Components/layouts/Settings/MainTop";
import CompanyInformation from "../Components/layouts/Settings/CompanyInformation";
import ContactInformation from "../Components/layouts/Settings/ContactInformation";
import LocationInformation from "../Components/layouts/Settings/LocationInformation";
import AuthenticationModal from "../Components/layouts/Settings/AuthenticationModal";
import SettingsActions from "../Components/layouts/Settings/SettingsActions";
import { Company_context } from "../context/AccountsContext";
import { admin_accounts_context } from "../context/AdminAccountsContext";
import { showError } from "../utils/toastUtils";

function SettingsMain() {
  const { company_accounts, update_company_info } = useContext(Company_context);

  const { adminAccounts } = useContext(admin_accounts_context);
  const logged_user_id = sessionStorage.getItem("logged_user_id");
  const user_type = sessionStorage.getItem("logged_user_type");
  const logged_user =
    user_type === "admin"
      ? adminAccounts[logged_user_id]
      : company_accounts[logged_user_id];
  const navigate = useNavigate();
  const [save_all, setSave_all] = useState(false);

  const [show, setShow] = useState(false);
  const [logged_user_data, setLogged_user_data] = useState(logged_user || {});

  // Sync logged_user_data with context changes
  useEffect(() => {
    const user_data =
      user_type === "admin"
        ? adminAccounts[logged_user_id]
        : company_accounts[logged_user_id];
    if (user_data) {
      setLogged_user_data(user_data);
    }
  }, []);

  // State to manage pending email changes from verification flow

  // State for authentication
  const [verify, setVerify] = useState("");

  const handlePasswordShow = () => {
    setShow((prev) => !prev);
  };

  const update_company = (newValue, key) => {
    setLogged_user_data((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleAuthenticity = (e) => {
    const value = e.target.value;
    setVerify(value);
  };

  const navigate_home = () =>
    user_type === "admin"
      ? (navigate("/admin/management"),
        sessionStorage.setItem("current_navbutton", "client_management"))
      : (navigate("/client/dashboard"),
        sessionStorage.setItem("current_navbutton", "jobs"));
  const handleAuthentication = () => {
    if (verify === logged_user_data.password) {
      try {
        // Apply pending email changes if any
        update_company_info(logged_user_id, logged_user_data);

        setSave_all(false);

        navigate_home();

        navigate_home();
      } catch (error) {
        showError("Failed to save changes. Please try again.");
      }
    } else {
      showError("Wrong Password");
    }
  };

  const handleUpdatingBranch = useCallback((newBranches) => {
    setLogged_user_data((prev) => ({
      ...prev,
      branches: newBranches,
    }));
  }, []);

  const handleClosingVerify = () => {
    setVerify("");
    setSave_all(false);
  };

  const handleSaveChanges = () => {
    setSave_all(true);
  };

  const handleCanceling = () => {
    navigate_home();
  };

  return (
    <div className="w-full p-6 pt-0 overflow-y-auto h-full flex flex-col items-start justify-start gap-4 text-text_b_l text-sm">
      <header className="w-full sticky top-0 pt-6 z-20 flex flex-col items-start justify-center bg-b_white/80 backdrop-blur-md rounded-small p-4">
        <Label
          text="Company Settings"
          class_name="font-semibold text-2xl text-text_b"
        />
        <Label
          text="Manage your company information and preferences"
          class_name="font-lighter text-sm opacity-80"
        />
      </header>

      <div className="flex w-full flex-col items-center justify-start gap-10 max-w-5xl mx-auto">
        {user_type === "company" && <MainTop />}

        <CompanyInformation
          company_information={logged_user_data}
          onCompanyUpdate={update_company}
        />
        <ContactInformation
          contact_information={logged_user_data}
          onCompanyUpdate={update_company}
        />
        <LocationInformation
          branches_information={logged_user_data.branches}
          onBranchUpdate={handleUpdatingBranch}
        />
      </div>

      <AuthenticationModal
        isOpen={save_all}
        onClose={handleClosingVerify}
        onAuthenticate={handleAuthentication}
        onPasswordChange={handleAuthenticity}
        showPassword={show}
        onTogglePassword={handlePasswordShow}
      />

      <SettingsActions onCancel={handleCanceling} onSave={handleSaveChanges} />
    </div>
  );
}

export default SettingsMain;
