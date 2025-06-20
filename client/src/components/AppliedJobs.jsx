import React, { useEffect, useState } from 'react';
import api from '../service/axios';
import useAuthStore from '../store/authStore';
import { PacmanLoader } from 'react-spinners';
const AppliedJobs = ({ setShowAppliedJobs, showAppliedJobs }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  // const setLoading = useAuthStore((state) => state.setLoading);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const res = await api.get('/myappliedjobs');
        setAppliedJobs(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch applied jobs:', error);

      }

    };

    fetchAppliedJobs();
  }, []);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString('en-IN') : 'N/A';

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      {
        loading && <div className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center">
        <PacmanLoader color="#36d7b7" size={25} />
      </div>
      }
      <div className="relative bg-white border p-6 pt-10 rounded-lg w-[90%] max-w-2xl max-h-[90vh]">
        <button
          onClick={() => setShowAppliedJobs(!showAppliedJobs)}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-red-600"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-black">My Applications</h2>

        {appliedJobs.length > 0 ? (
          <ul className="space-y-4 max-h-[50vh] overflow-y-auto">
            {appliedJobs.map((app) => (
              <li
                key={app._id}
                className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
              >
                <h3 className="text-lg font-semibold text-black">
                  {app.jobId?.title || 'Job Deleted'}
                </h3>
                <p className="text-sm text-gray-700">Company: {app.jobId?.company || 'N/A'}</p>
                <p className="text-sm text-gray-700">Location: {app.jobId?.location || 'N/A'}</p>
                <p className="text-sm">Applied on: {formatDate(app.appliedAt)}</p>
                <p className="text-sm">
                  Status:{' '}
                  <span className="font-semibold text-blue-600">{app.status}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't applied to any jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
