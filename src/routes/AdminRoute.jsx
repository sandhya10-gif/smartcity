import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const role = localStorage.getItem("role");

  if (role === "ADMIN") {
    return <Outlet />;
  }

  return <Navigate to="/dashboard" replace />;
}
