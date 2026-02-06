import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import MiniLoader from '../components/minicomponents/MiniLoader.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <MiniLoader className='w-screen h-screen' />
      </div>
    );
  }
  return user ? children : <Navigate to={'/login'} replace />
}