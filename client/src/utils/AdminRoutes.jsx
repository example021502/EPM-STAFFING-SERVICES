import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { showWarning } from "./toastUtils";

function AdminRoutes() {
  const user_type = sessionStorage.getItem("user_type");
  const isAdmin = user_type === "admin";
  return isAdmin ? <Outlet /> : <Navigate to={"/signing"} />;
}

export default AdminRoutes;
