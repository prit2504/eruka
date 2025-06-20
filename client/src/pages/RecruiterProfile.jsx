import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import api from '../service/axios';
import { PacmanLoader } from 'react-spinners';

const RecruiterProfile = () => {
  const { user, loading } = useAuthStore();
  const setLoading = useAuthStore((state) => state.setLoading);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [companyData, setCompanyData] = useState({
    companyName: '',
    designation: '',
    website: '',
    location: '',
    about: ''
  });

  const [ploading, setPLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        setPLoading(true);
        const res1 = await api.get('/profile/getRecruiterProfile');
        const res2 = await api.get('/me');

        if (res1?.data?.profile) {
          const p = res1.data.profile;
          setCompanyData({
            companyName: p.companyName || '',
            designation: p.designation || '',
            website: p.website || '',
            location: p.location || '',
            about: p.about || ''
          });
        }

        if (res2?.data) {
          const u = res2.data;
          setFormData({
            name: u.name || '',
            email: u.email || ''
          });
        }

      } catch (err) {
        setErrorMsg("Error fetching profile data.");
        console.error('Error fetching recruiter data:', err?.response?.data || err.message);
      } finally {
        setPLoading(false);
      }
    };

    fetchRecruiterData();
  }, []);

  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  const handleBasicSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    try {
      setLoading(true);
      await api.put('/updateDetail', formData);
      setLoading(false);
      setSuccessMsg('Basic details updated!');
      
    } catch (err) {
      console.error(err?.response?.data || err.message);
      setErrorMsg('Failed to update basic details.');
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await api.post('/profile/recruiter', companyData); 
      setSuccessMsg('Company info updated!');
      setLoading(false)
    } catch (err) {
      console.error(err?.response?.data || err.message);
      setErrorMsg("Failed to update company info.");
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="pt-24 px-2 sm:px-8 py-8 bg-gradient-to-br from-blue-50 to-yellow-50 min-h-screen flex flex-col items-center">
      {ploading && (
        <div className="fixed w-full left-0 min-h-screen top-0 flex justify-center items-center bg-white/60 z-50">
          <PacmanLoader color="#3B82F6" size={20} />
        </div>
      )}

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden">
        <aside className="bg-gradient-to-b from-blue-500 to-blue-400 text-white flex flex-col items-center justify-center p-8 ">
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-blue-600 text-4xl font-bold shadow-lg mb-4">
            {getInitials(formData.name)}
          </div>
          <div className="text-xl font-semibold">{formData.name || 'Your Name'}</div>
          <div className="text-sm opacity-80">{formData.email || 'Your Email'}</div>
          <div className="mt-6 text-center text-blue-100">
            {companyData.about ? (
              <span className="italic">"{companyData.about.slice(0, 80)}{companyData.about.length > 80 ? '...' : ''}"</span>
            ) : (
              <span className="italic opacity-60">No bio yet.</span>
            )}
          </div>
        </aside>

        <main className="flex-1 p-6 sm:p-10 bg-white">
          {(successMsg || errorMsg) && (
            <div className={`mb-4 px-4 py-2 rounded-lg text-center font-semibold transition-all duration-300
              ${successMsg ? 'bg-green-100 text-green-700 border border-green-300' : ''}
              ${errorMsg ? 'bg-red-100 text-red-700 border border-red-300' : ''}`}>
              {successMsg || errorMsg}
            </div>
          )}

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Basic Information</h2>
            <form className="flex flex-col sm:flex-row gap-4 items-center" onSubmit={handleBasicSubmit}>
              <div className="flex-1 w-full">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleBasicChange}
                  placeholder="Your Name"
                  className="border-2 p-3 rounded-lg border-blue-300 w-full placeholder:font-semibold font-semibold text-gray-700 focus:ring-2 focus:ring-blue-200 transition"
                  autoComplete="off"
                />
              </div>
              <div className="flex-1 w-full">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleBasicChange}
                  placeholder="Your Email"
                  className="border-2 p-3 rounded-lg border-blue-300 w-full placeholder:font-semibold font-semibold text-gray-700 focus:ring-2 focus:ring-blue-200 transition"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-yellow-400 hover:text-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 mt-2 sm:mt-0"
              >
                Update
              </button>
            </form>
          </section>

          <hr className="my-6 border-blue-100" />

          <section>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Company Details</h2>
            <form className="flex flex-col gap-4" onSubmit={handleCompanySubmit}>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={companyData.companyName}
                  onChange={handleCompanyChange}
                  className="border-2 p-3 rounded-lg border-blue-300 w-full font-semibold text-gray-700 resize-none focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <input
                  id="designation"
                  type="text"
                  name="designation"
                  value={companyData.designation}
                  onChange={handleCompanyChange}
                  className="border-2 p-3 rounded-lg border-blue-300 w-full font-semibold text-gray-700 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={companyData.website}
                  onChange={handleCompanyChange}
                  className="border-2 p-3 rounded-lg border-blue-300 w-full font-semibold text-gray-700 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={companyData.location}
                  onChange={handleCompanyChange}
                  className="border-2 p-3 rounded-lg border-blue-300 w-full font-semibold text-gray-700 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">About</label>
                <textarea
                  id="about"
                  rows="3"
                  name="about"
                  value={companyData.about}
                  onChange={handleCompanyChange}
                  className="border-2 p-3 rounded-lg border-blue-300 w-full font-semibold text-gray-700 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-yellow-400 hover:text-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 mt-2 w-max"
              >
                Save Details
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RecruiterProfile;
