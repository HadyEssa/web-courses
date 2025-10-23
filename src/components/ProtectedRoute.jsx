import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Authcontext'; // Adjust path if necessary

const ProtectedRoute = () => {
  const { currentuser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return currentuser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;