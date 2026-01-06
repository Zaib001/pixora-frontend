// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const { token, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (token) {
    const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
    return <Navigate to={isAdmin ? "/dashboard/admin" : "/dashboard"} replace />;
  }

  return <Outlet />;
}
