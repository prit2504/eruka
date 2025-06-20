import React from 'react';

const UserFilter = ({ filter, setFilter }) => {
  const workModeArray = ['work-from-office', 'work-from-home', 'hybrid'];
  const locationArray = ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Kolkata'];
  const salaryArray = ['< 5 LPA', '5-10 LPA', '10-15 LPA', '15-20 LPA', '> 20 LPA'];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setFilter((prev) => {
      const values = prev[name];

      if (checked) {
        return {
          ...prev,
          [name]: [...values, value],
        };
      } else {
        return {
          ...prev,
          [name]: values.filter((item) => item !== value),
        };
      }
    });
  };

  return (
    <div className='w-full sm:w-[18%] pl-4 border rounded-lg py-3 space-y-3'>
      <h1 className='text-2xl font-semibold'>Filters</h1>

      <div className='text-md font-semibold flex flex-col'>
        <h1>Work mode</h1>
        {workModeArray.map((type, index) => (
          <label key={index} className='text-gray-600 text-sm'>
            <input
              type='checkbox'
              name='type'
              value={type}
              checked={filter.type.includes(type)}
              onChange={handleChange}
              className='mx-2'
            />
            {type}
          </label>
        ))}
      </div>

      <div className='text-md font-semibold flex flex-col'>
        <h1>Location</h1>
        {locationArray.map((location, index) => (
          <label key={index} className='text-gray-600 text-sm'>
            <input
              type='checkbox'
              name='location'
              value={location}
              checked={filter.location.includes(location)}
              onChange={handleChange}
              className='mx-2'
            />
            {location}
          </label>
        ))}
      </div>

      <div className='text-md font-semibold flex flex-col'>
        <h1>Salary</h1>
        {salaryArray.map((salary, index) => (
          <label key={index} className='text-gray-600 text-sm'>
            <input
              type='checkbox'
              name='salary'
              value={salary}
              checked={filter.salary.includes(salary)}
              onChange={handleChange}
              className='mx-2'
            />
            {salary}
          </label>
        ))}
      </div>
    </div>
  );
};

export default UserFilter;
