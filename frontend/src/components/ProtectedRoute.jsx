import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./comman/Footer";

const ProtectedRoute = ({ user, authChecked, roles, redirectTo = "/login" }) => {
  if (!authChecked) return null;

  if (!user) return <Navigate to={redirectTo} replace />;

  if (Array.isArray(roles) && roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
