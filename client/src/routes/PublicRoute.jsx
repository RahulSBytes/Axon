// src/routes/PublicRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const location = useLocation();
  const isAuthenticated = true;

  // if (loading) {
  //   return (
  //     <div className="h-screen flex items-center justify-center bg-primary">
  //       <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  // Redirect to previous page or home if already authenticated
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;