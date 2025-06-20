import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import api from '../service/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recruiter_PostJob = () => {
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'work-from-office',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    email: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobPayload = {
      title: formData.title,
      company: formData.company,
      type: formData.type,
      location: formData.location,
      salary: formData.salary,
      description: formData.description,
      requirements: formData.requirements.split(',').map(r => r.trim()),
      email: formData.email,
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    try {
      const res = await api.post('/jobs', jobPayload);
      toast.success('Job posted successfully!');
      setFormData({
        title: '',
        company: '',
        type: 'work-from-office',
        location: '',
        salary: '',
        description: '',
        requirements: '',
        email: '',
        startDate: '',
        endDate: ''
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to post job.');
    }
  };

  return (
    <div>
      <h1 className='text-xl font-semibold'>Post a new Job</h1>

      <form className='flex flex-col gap-3 mt-5' onSubmit={handleSubmit}>
        <input
          name='title'
          value={formData.title}
          onChange={handleChange}
          className='border-2 border-gray-300 w-[80%] py-1 px-2 rounded-lg font-semibold placeholder:text-xs'
          placeholder='Enter job title'
          required
        />

        <input
          name='company'
          value={formData.company}
          onChange={handleChange}
          className='border-2 border-gray-300 w-[80%] py-1 px-2 rounded-lg font-semibold placeholder:text-xs'
          placeholder='Enter company name'
          required
        />

        <select
          name='type'
          value={formData.type}
          onChange={handleChange}
          className='border-2 border-gray-300 w-[80%] py-1 px-2 rounded-lg font-semibold'
          required
        >
          <option value='work-from-office'>Work from office</option>
          <option value='work-from-home'>Work from home</option>
          <option value='hybrid'>Hybrid</option>
        </select>

        <input
          name='location'
          value={formData.location}
          onChange={handleChange}
          className='border-2 border-gray-300 w-[80%] py-1 px-2 rounded-lg font-semibold placeholder:text-xs'
          placeholder='Enter job location'
          required
        />

        <div className='flex flex-row gap-5'>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            className='border-2 border-gray-300 py-1 px-2 rounded-lg'
            required
          />
          <h2 className='font-semibold'>to</h2>
          <input
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            className='border-2 border-gray-300 py-1 px-2 rounded-lg'
            required
          />
        </div>

        <input
          name='salary'
          value={formData.salary}
          onChange={handleChange}
          className='border-2 border-gray-300 w-[80%] py-1 px-2 rounded-lg font-semibold placeholder:text-xs'
          placeholder='Enter salary (optional)'
        />

        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          rows='2'
          placeholder='Enter job description'
          className='border-2 border-gray-300 w-[80%] py-1 px-2 rounded-lg font-semibold placeholder:text-xs'
          required
        />

        <textarea
          name='requirements'
          value={formData.requirements}
          onChange={handleChange}
          rows='2'
          placeholder='Enter job requirements (comma separated)'
          className='border-2 border-gray-300 w-[80%] py-1 px-2 rounded-lg font-semibold placeholder:text-xs'
          required
        />

        <div className='flex flex-row justify-between w-[80%]'>
          <input
            name='email'
            value={formData.email}
            onChange={handleChange}
            type='email'
            placeholder='Enter contact email'
            className='border-2 border-gray-300 w-[40%] py-1 px-2 rounded-lg font-semibold placeholder:text-xs'
            required
          />

          <button
            type='submit'
            className='border py-1 px-4 rounded-lg text-blue-500 font-semibold bg-blue-100 hover:bg-blue-200 transition'
          >
            Post <i className='fa fa-arrow-right' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Recruiter_PostJob;
