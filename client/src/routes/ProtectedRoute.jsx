import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  }
     return user ? children : <Navigate to={'/login'} replace />
}