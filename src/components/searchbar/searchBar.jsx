// eslint-disable-next-line no-unused-vars
import React from 'react';
import { SearchIcon } from '@heroicons/react/outline'; // Importamos el ícono de búsqueda desde Heroicons

// eslint-disable-next-line react/prop-types
function SearchInput({ searchTerm, onSearch }) {
  return (
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="p-2 pl-10 pr-4 border border-gray-300 rounded-l-md focus:outline-none w-48 md:w-full"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}

export default SearchInput;
