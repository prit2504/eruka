import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-xs text-white px-3 rounded-sm font-bold py-1 cursor-pointer">
      <i className="fa fa-sign-out" aria-hidden="true"></i>

    </button>
  );
};

export default LogoutButton;
