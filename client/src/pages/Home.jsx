import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import UserFilter from '../components/UserFilter';
import JobCard from '../components/JobCard';
import AppliedJobs from '../components/AppliedJobs';

const Home = () => {
  const [jobList, setJobList] = useState([]);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);

  const [filter, setFilter] = useState({
    type: [],
    location: [],
    salary: []
  });

  const applyFilters = (jobs) => {
    return jobs.filter((job) => {
      const matchType =
        filter.type.length === 0 || filter.type.includes(job.type);
      const matchLocation =
        filter.location.length === 0 || filter.location.includes(job.location);
      const matchSalary =
        filter.salary.length === 0 || filter.salary.includes(job.salary);
      return matchType && matchLocation && matchSalary;
    });
  };

  return (
    <div className='px-4 pt-19 text-black space-y-5 relative'>
      <Searchbar onResults={setJobList} />

      <button
        onClick={() => setShowAppliedJobs(!showAppliedJobs)}
        className='bg-blue-500 rounded-md py-1 px-3 text-white font-semibold'
      >
        View Applied Jobs
      </button>

      {showAppliedJobs && (
        <AppliedJobs
          showAppliedJobs={showAppliedJobs}
          setShowAppliedJobs={setShowAppliedJobs}
        />
      )}

      <div className='flex flex-row space-x-5'>
        <UserFilter filter={filter} setFilter={setFilter} />

        <div className='w-full'>
          <div className='rounded-lg p-4 grid grid-cols-2 gap-3'>
            {applyFilters(jobList).length === 0 ? (
              <p className='text-gray-500 text-center'>
                No jobs found. Try adjusting filters.
              </p>
            ) : (
              applyFilters(jobList).map((job) => (
                <JobCard key={job._id} job={job} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
