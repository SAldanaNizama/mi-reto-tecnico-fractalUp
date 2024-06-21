// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from 'react';

// eslint-disable-next-line react/prop-types
function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = useCallback((e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    onSearch(newTerm);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleInputChange}
        className="p-2 pl-4 pr-10 border border-gray-300 rounded-l focus:outline-none w-64 md:w-80"
        style={{ maxWidth: '400px' }} 
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="px-3 py-2 text-sm sm:text-base
                     bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
                     text-white font-medium rounded-r shadow-md 
                     transition duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchInput;