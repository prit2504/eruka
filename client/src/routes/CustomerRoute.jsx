import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const CustomerRoute = ({ children }) => {
  const { user, loading } = useAuthStore();
  if (loading) return <p>Loading...</p>;

  return user && user.role === 'jobseeker' ? children : <Navigate to="/login" />;
};

export default CustomerRoute;
