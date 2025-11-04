// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const { token } = useSelector((state) => state.auth);

  if (token) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
