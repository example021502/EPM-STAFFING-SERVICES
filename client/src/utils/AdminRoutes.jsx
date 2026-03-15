import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { log_state } from "../context/LogState";

function AdminRoutes() {
  const { log } = useContext(log_state);
  const user_type = sessionStorage.getItem("logged_user_type");
  const isAdmin = user_type === "admin" && log;
  return isAdmin ? <Outlet /> : <Navigate to={"/signing"} />;
}

export default AdminRoutes;
