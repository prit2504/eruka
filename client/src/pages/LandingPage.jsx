import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const scrollVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <motion.h1
        className="text-4xl sm:text-6xl font-extrabold text-blue-600 text-center drop-shadow-sm"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Welcome to Eruka.com
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-600 mt-4 text-center max-w-xl"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        Your one-stop platform for jobs & freelancing opportunities
      </motion.p>

      <motion.p
        className="text-lg sm:text-xl text-gray-600 mt-2 text-center max-w-xl"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        Start your career journey today!
      </motion.p>

      <motion.button
        className="bg-blue-600 hover:bg-yellow-500 text-white font-semibold px-6 py-3 mt-8 rounded-xl transition duration-300 shadow-lg"
        onClick={() => navigate('/login')}
        whileHover={{ scale: 1.08, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        Get Started
      </motion.button>

      <motion.div
        ref={ref}
        className="max-w-2xl w-full mt-24 bg-white rounded-2xl p-8 shadow-2xl border-t-8 border-blue-500"
        variants={scrollVariant}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-2xl text-blue-700 font-semibold mb-3">Why Choose Us?</h2>
        <p className="text-gray-600 text-lg">
          Trusted recruiters, flexible work options, and secure applications — Eruka.com makes job hunting easier than ever.
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
