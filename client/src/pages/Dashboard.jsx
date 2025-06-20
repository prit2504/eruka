import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import Recruiter_PostJob from '../components/Recruiter_PostJob';
import Recruiter_ReviewApps from '../components/Recruiter_ReviewApps'; // Create this if not already

const Dashboard = () => {
  const { user } = useAuthStore();
  const [activeView, setActiveView] = useState('postJob');

  if (!user) return null;

  return (
    <div className='pt-24 px-4 md:px-10 flex flex-col md:flex-row gap-8'>
      <div className='border rounded-xl flex flex-col items-center space-y-5 py-6 w-full  sm:h-[500px] md:w-1/4'>
        <i className="fa fa-user-circle text-6xl sm:border-[50px] rounded-full border-gray-300" aria-hidden="true"></i>
        <div className='text-center'>
          <p className='font-semibold break-words'>{user.name}</p>
          <p className='font-semibold break-words'>{user.email}</p>
        </div>
        <button
          onClick={() => setActiveView('postJob')}
          className={`font-semibold rounded-md py-2 px-4 w-[80%] transition ${
            activeView === 'postJob' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
          }`}
        >
          Post a Job
        </button>
        <button
          onClick={() => setActiveView('reviewApps')}
          className={`font-semibold rounded-md py-2 px-4 w-[80%] transition ${
            activeView === 'reviewApps' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
          }`}
        >
          Review Applications
        </button>
      </div>

      <div className='w-full md:w-3/4'>
        {activeView === 'postJob' && <Recruiter_PostJob />}
        {activeView === 'reviewApps' && <Recruiter_ReviewApps />}
      </div>
    </div>
  );
};

export default Dashboard;
