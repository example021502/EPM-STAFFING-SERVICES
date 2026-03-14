import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { log_state } from "../context/LogState";
function ProtectedRoutes() {
  const { log } = useContext(log_state);

  return log ? <Outlet /> : <Navigate to={"Signing"} />;
}

export default ProtectedRoutes;
