import React, { useEffect, useState, useCallback } from 'react';
import api from '../service/axios';

const Recruiter_ReviewApps = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [fullProfile, setFullProfile] = useState(null);

  const fetchJobsAndApplications = useCallback(async () => {
    try {
      const res = await api.get('/jobs/');
      const jobs = res.data || [];
      setJobs(jobs);

      const apps = {};
      await Promise.all(
        jobs.map(async (job) => {
          const response = await api.get(`/applications/${job._id}`);
          apps[job._id] = response.data;
        })
      );
      setApplications(apps);

    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  useEffect(() => {
    fetchJobsAndApplications();
  }, [fetchJobsAndApplications]);

  const handleDeleteJob = async (jobId) => {
    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      setApplications((prev) => {
        const newApps = { ...prev };
        delete newApps[jobId];
        return newApps;
      });
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleStatusChange = async (appId, status, jobId) => {
    try {
      await api.put(`/applications/${appId}/status`, { status });
      const updated = await api.get(`/applications/${jobId}`);
      setApplications((prev) => ({ ...prev, [jobId]: updated.data }));

    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const fetchFullProfile = async (userId) => {
    try {
      const res = await api.get(`/profile/getProfileForRecruiter/${userId}`);
      setFullProfile(res.data.profile);
    } catch (err) {
      console.error('Full profile fetch failed:', err);
    }
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString('en-IN') : '');

  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="border border-gray-300 rounded-lg p-4 text-sm text-gray-700 shadow-md"
          >
            <h1 className="text-lg text-black font-semibold">{job.title}</h1>
            <p className="text-sm font-semibold text-gray-800">
              {job.company} - {job.type} | Duration: <span>{formatDate(job.startDate)}</span> - <span>{formatDate(job.endDate)}</span>
            </p>
            <p className="mb-1">{job.location}</p>
            <p className="mb-1">{job.description}</p>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-600 font-medium">{job.email}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="bg-red-500 text-white font-semibold rounded-md px-3 py-1 hover:bg-red-600"
                >
                  Drop Post
                </button>
                <button
                  onClick={() => setSelectedJobId(job._id)}
                  className=" relative bg-blue-500 text-white font-semibold rounded-md px-3 py-1 hover:bg-blue-600"
                >
                  View Applicants
                  {
                    applications[job._id]?.length == 0 ? " "
                    :
                    <span className='bg-red-500 px-[6px] rounded-full relative top-[-15px] right-[-15px]'>
                    {applications[job._id]?.length || 0}
                  </span>
                  }
                  
                </button>

              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedJobId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white border p-6 rounded-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => {
                setSelectedJobId(null);
                setSelectedApplicant(null);
                setFullProfile(null);
              }}
              className="absolute top-2 right-4 text-xl font-bold text-gray-700 hover:text-black"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-black">Applicants</h2>
            {applications[selectedJobId]?.length > 0 ? (
              applications[selectedJobId].map((app) => (
                <div key={app._id} className="border rounded-md p-3 mb-3 bg-gray-100">
                  <p className="font-semibold text-black">{app.applicantId.name}</p>
                  <p className="text-sm text-gray-700">{app.applicantId.email}</p>
                  <p className="text-sm">Status: <span className="font-medium text-blue-700">{app.status}</span></p>
                  {app.resumeUrl && (
                    <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">View Resume</a>
                  )}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedApplicant(app);
                        fetchFullProfile(app.applicantId._id);
                      }}
                      className="bg-gray-300 px-2 py-1 rounded-md text-sm hover:bg-gray-400"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No applicants yet.</p>
            )}
          </div>
        </div>
      )}

      {selectedApplicant && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border p-6 rounded-lg w-[90%] max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setSelectedApplicant(null);
                setFullProfile(null);
              }}
              className="absolute top-2 right-4 text-xl font-bold text-gray-700 hover:text-black"
            >
              ×
            </button>
            <h2 className="text-lg font-bold text-black mb-4">Applicant Profile</h2>

            <p><strong>Name:</strong> {selectedApplicant.applicantId.name}</p>
            <p><strong>Email:</strong> {selectedApplicant.applicantId.email}</p>
            <p><strong>Applied At:</strong> {formatDate(selectedApplicant.appliedAt)}</p>
            <p><strong>Status:</strong> {selectedApplicant.status}</p>
            {selectedApplicant.resumeUrl && (
              <p><strong>Resume:</strong> <a href={selectedApplicant.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a></p>
            )}

            {fullProfile ? (
              <div className="mt-4 text-sm text-gray-800">
                <p><strong>Experience:</strong> {fullProfile.experience}</p>
                <p><strong>Education:</strong> {fullProfile.education}</p>
                <p><strong>Skills:</strong> {fullProfile.skills?.join(', ')}</p>
                <p><strong>Preferred Locations:</strong> {fullProfile.preferredLocations?.join(', ')}</p>
                <p><strong>About:</strong> {fullProfile.about}</p>
                {fullProfile.resumeLink && (
                  <p><strong>External Resume Link:</strong> <a href={fullProfile.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a></p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">Loading full profile...</p>
            )}

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  handleStatusChange(selectedApplicant._id, 'shortlisted', selectedJobId);
                  setSelectedApplicant(null);
                  setFullProfile(null);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Shortlist
              </button>
              <button
                onClick={() => {
                  handleStatusChange(selectedApplicant._id, 'rejected', selectedJobId);
                  setSelectedApplicant(null);
                  setFullProfile(null);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recruiter_ReviewApps;
