import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import MiniLoader from '../components/minicomponents/MiniLoader.jsx';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/home') {
      const timer = setTimeout(() => {
        import('../components/Pages/Saved.jsx');
        import('../components/Pages/Chat.jsx');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);


  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <MiniLoader className='w-screen h-screen' />
      </div>
    );
  }

  return user ? children : <Navigate to={'/login'} replace />
}