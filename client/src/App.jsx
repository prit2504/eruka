import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CustomerRoute from './routes/CustomerRoute';
import ProviderRoute from './routes/ProviderRoute';
import Profile from './pages/Profile';
import RecruiterProfile from './pages/RecruiterProfile';
import { PacmanLoader } from 'react-spinners';

import { Navigate } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user,fetchUser } = useAuthStore();
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    fetchUser();
  }, []);

  return (

    <div className='min-h-screen'>
      {loading && (
        <div className="fixed w-full left-0 min-h-screen top-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50">
          <PacmanLoader color="#3B82F6" size={20} />
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />


          <Route
            path="/login"
            element={
              user ? (
                user.role === 'jobseeker' ? <Navigate to="/home" replace /> : <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            }
          />


          <Route
            path="/register"
            element={
              user ? (
                user.role === 'jobseeker' ? <Navigate to="/home" replace /> : <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />


          <Route path="/home" element={
            <CustomerRoute>
              <Home />
            </CustomerRoute>
          } />

          <Route path="/dashboard" element={
            <ProviderRoute>
              <Dashboard />
            </ProviderRoute>
          } />


          <Route path="/profile" element={
            <CustomerRoute>
              <Profile />
            </CustomerRoute>
          } />

          <Route path="/recruiterProfile" element={
            <ProviderRoute>
              <RecruiterProfile />
            </ProviderRoute>
          } />

          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
