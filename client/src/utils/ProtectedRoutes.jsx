import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { log_state } from "../context/LogState";
function ProtectedRoutes() {
  const { log } = useContext(log_state);
  const user_type = sessionStorage.getItem("logged_user_type");
  const isCompany = user_type === "company" && log;

  return isCompany ? <Outlet /> : <Navigate to={"Signing"} />;
}

export default ProtectedRoutes;
