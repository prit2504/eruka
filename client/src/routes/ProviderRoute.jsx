import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProviderRoute = ({ children }) => {
  const { user, loading } = useAuthStore();
  if (loading) return <p>Loading...</p>;

  return user && user.role === 'recruiter' ? children : <Navigate to="/login" />;
};

export default ProviderRoute;
