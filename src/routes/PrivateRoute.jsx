// PrivateRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated, user, requiresVerification, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresVerification && location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />;
  }

  // Strict Admin Redirection: If user is admin and NOT on an admin path, redirect to admin dashboard
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  const isAdminPath = location.pathname.startsWith('/dashboard/admin');

  if (isAdmin && !isAdminPath) {
    return <Navigate to="/dashboard/admin" replace />;
  }

  // Strict User Redirection: If user is NOT admin and IS on an admin path, redirect to user dashboard
  // (However, AdminRoute handles this more specifically for /dashboard/admin/* routes)
  if (!isAdmin && isAdminPath) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
