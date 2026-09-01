import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { getDashboardByRole } from "@/utils/authRedirect";

const RoleRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Belum login → kembali ke halaman login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  const currentRole = user?.role;

  // Role sesuai dengan route → izinkan akses
  if (allowedRoles.includes(currentRole)) {
    return <Outlet />;
  }

  if (currentRole === "murid") {
    return (
      <Navigate
        to={getDashboardByRole("murid")}
        replace
      />
    );
  }

  return (
    <Navigate
      to="/unauthorized"
      replace
    />
  );
};

export default RoleRoute;