import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import api from '../service/axios';
import { PacmanLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, fetchUser, loading} = useAuthStore();
  const setLoading = useAuthStore((state) => state.setLoading);
  const [ploading, setPLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });


  const [profileData, setProfileData] = useState({
    about: '',
    resumeLink: '',
    skills: '',
    experience: '',
    preferredLocations: '',
    education: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setPLoading(true);
        const res1 = await api.get("/profile/getProfile");
        const res2 = await api.get("/me");

        if (res1?.data?.profile) {
          const p = res1.data.profile;
          setProfileData({
            about: p.about || '',
            resumeLink: p.resumeLink || '',
            skills: p.skills || '',
            experience: p.experience || '',
            preferredLocations: p.preferredLocations || '',
            education: p.education || ''
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
        toast.error("Error fetching profile data.");
        console.error("Error fetching profile data:", err);
      }
      finally {
        setPLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleBasicSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put('/updateDetail', formData);
      setLoading(false);
      toast.success('Basic details updated!');
    } catch (err) {
      toast.error('Failed to update basic details.');
    }

  };

  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/profile/jobseeker', profileData);
      toast.success('Profile details updated!');
      setLoading(false);
    } catch (err) {
      toast.error('Failed to update profile details.');
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="pt-24 px-2 sm:px-8 py-8 bg-gradient-to-br from-blue-50 to-yellow-50 min-h-screen flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />
      {ploading && (
        <div className="fixed w-full left-0 min-h-screen top-0 flex justify-center items-center bg-white/60 z-50">
          <PacmanLoader color="#3B82F6" size={20} />
        </div>
      )}

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden">
        <aside className="bg-gradient-to-b from-blue-500 to-blue-400 text-white flex flex-col items-center justify-center p-8">
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-blue-600 text-4xl font-bold shadow-lg mb-4">
            {getInitials(formData.name)}
          </div>
          <div className="text-xl font-semibold">{formData.name || 'Your Name'}</div>
          <div className="text-sm opacity-80">{formData.email || 'Your Email'}</div>
          <div className="mt-6 text-center text-blue-100">
            {profileData.about ? (
              <span className="italic">"{profileData.about.slice(0, 80)}{profileData.about.length > 80 ? '...' : ''}"</span>
            ) : (
              <span className="italic opacity-60">No bio yet.</span>
            )}
          </div>
        </aside>

        <main className="flex-1 p-6 sm:p-10 bg-white">
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
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Profile Details</h2>
            <form className="flex flex-col gap-4" onSubmit={handleDetailSubmit}>
              {[
                ['about', 'About / Bio', 'textarea', 'Tell us about yourself'],
                ['resumeLink', 'Resume Link', 'text', 'Google Drive / PDF link'],
                ['skills', 'Skills', 'text', 'Skills (comma separated)'],
                ['experience', 'Experience', 'text', 'e.g. 2 years'],
                ['preferredLocations', 'Preferred Locations', 'text', 'Preferred Job Locations'],
                ['education', 'Education', 'text', 'e.g. B.Tech, MCA']
              ].map(([name, label, type, placeholder]) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      id={name}
                      name={name}
                      rows="3"
                      value={profileData[name]}
                      onChange={handleDetailChange}
                      placeholder={placeholder}
                      className="border-2 p-3 rounded-lg border-blue-300 w-full placeholder:font-semibold font-semibold text-gray-700 resize-none focus:ring-2 focus:ring-blue-200 transition"
                    />
                  ) : (
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={profileData[name]}
                      onChange={handleDetailChange}
                      placeholder={placeholder}
                      className="border-2 p-3 rounded-lg border-blue-300 w-full placeholder:font-semibold font-semibold text-gray-700 focus:ring-2 focus:ring-blue-200 transition"
                    />
                  )}
                </div>
              ))}
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

export default Profile;
