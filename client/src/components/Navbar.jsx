import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = useLocation().pathname;

  const navLinks = [
    { name: 'Home', href: user?.role === 'jobseeker' ? '/home' : '/dashboard' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <motion.nav
        className='fixed top-0 w-full bg-blue-100 shadow-sm z-50 px-4 py-3 sm:px-8 sm:py-4 '
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className='max-w-7xl mx-auto flex justify-between items-center '>
          <Link to='/' className='text-blue-600 text-xl sm:text-2xl font-bold'>
            [Eruka]<span className='text-yellow-500'>.com</span>
          </Link>

          <div className='flex items-center gap-4 sm:gap-6'>
            <div className='hidden sm:flex gap-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm sm:text-base font-semibold px-3 py-1 rounded-md transition
                    ${pathname === link.href
                      ? 'text-yellow-500 bg-white border border-yellow-400'
                      : 'text-blue-600 hover:text-yellow-500'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {user ? (
              <>
                <Link
                  to={user.role === 'jobseeker' ? '/profile' : '/recruiterProfile'}
                  className={`text-sm sm:text-base bg-white font-medium px-3 py-1 rounded-md transition
                    ${pathname.includes('profile')
                      ? 'text-yellow-500 bg-white border border-yellow-400'
                      : 'text-blue-500 hover:bg-blue-100 border border-blue-500'
                    }`}
                >
                  <i className="fa fa-user mr-1" /> Profile
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link to='/login'>
                  <motion.p
                    className={`border rounded-md px-3 py-1 text-sm sm:text-base font-medium hover:text-yellow-500 bg-white transition
                    ${pathname === '/login'
                      ? 'text-yellow-500 bg-white border border-yellow-400'
                      : 'text-blue-600 hover:text-yellow-500'
                    }`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.p>
                </Link>
                <Link to='/register'>
                  <motion.p
                    className={`border rounded-md px-3 py-1 text-sm sm:text-base font-medium hover:text-yellow-500 bg-white transition
                    ${pathname === '/register'
                      ? 'text-yellow-500 bg-white border border-yellow-400'
                      : 'text-orange-600 hover:text-yellow-500'
                    }`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.p>
                </Link>
              </>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-blue-600 text-xl border px-3 py-1 rounded-md bg-white shadow hover:bg-gray-100 transition sm:hidden'
            >
              ☰
            </button>
          </div>
        </div>
      </motion.nav>

      {isMenuOpen && (
        <div className='fixed top-20 right-4 w-40 bg-white rounded-lg shadow-md z-50 border sm:hidden'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium border-b last:border-none transition
                ${pathname === link.href
                  ? 'text-yellow-500 bg-gray-100'
                  : 'text-blue-700 hover:text-yellow-500 hover:bg-gray-50'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
