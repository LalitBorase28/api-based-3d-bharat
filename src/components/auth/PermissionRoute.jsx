import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PermissionRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role");

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PermissionRoute;
