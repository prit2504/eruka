import React, { useEffect, useState } from 'react';
import api from '../service/axios';

const JobCard = ({ job }) => {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN');
  };

  // Check if already applied
  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const res = await api.get(`/status/${job._id}`);
        if (res.data.applied) {
          setApplied(true);
        }
      } catch (err) {
        console.error("Failed to check application status", err);
      }
    };

    checkApplicationStatus();
  }, [job._id]);

  const handleApply = async () => {
    setLoading(true);
    try {
      const res = await api.post('/apply', {
        jobId: job._id
      });

      if (res.status === 201) {
        alert('Successfully applied for the job!');
        setApplied(true);
      }
    } catch (err) {
      console.error("Application failed:", err);
      alert(err?.response?.data?.message || 'Failed to apply');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 text-gray-700 text-sm border border-gray-400 flex flex-col justify-between">
      <h1 className='text-lg text-black font-semibold'>{job.title}</h1>
      <p className='text-gray-800 font-semibold'>
        {job.company} - {job.type} | Duration: <span>{formatDate(job.startDate)}</span> - <span>{formatDate(job.endDate)}</span>
      </p>
      <p className='mb-1'>{job.location} | Salary : {job.salary}</p>
      <p className='mb-1'>{job.description}</p>

      <div className='flex flex-row justify-between items-center'>
        <p className='mb-2 text-blue-600 font-medium'>{job.email}</p>
        <button
          onClick={handleApply}
          disabled={applied || loading}
          className={`px-3 py-1 rounded-md font-semibold ${
            applied
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {applied ? 'Applied' : loading ? 'Applying...' : 'Apply'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
