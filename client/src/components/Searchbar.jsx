import React, { useState, useEffect } from 'react';
import api from '../service/axios';

const Searchbar = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeout); 
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedQuery.trim()) {
        onResults([]); 
        return;
      }

      try {
        const res = await api.get(`/jobs/search?query=${debouncedQuery}`);
        onResults(res.data);
      } catch (error) {
        console.error('Search failed:', error);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery, onResults]);

  return (
    <div className='w-full text-center bg-white z-50 py-2'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for jobs, companies, locations...'
        className='py-2 px-3 rounded-lg bg-gray-200 w-[60%] placeholder:font-semibold font-semibold text-gray-700 outline-none'
      />
    </div>
  );
};

export default Searchbar;
