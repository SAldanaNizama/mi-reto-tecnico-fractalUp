import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
function SearchBar({ onSearch, onFilter }) {
  const [search, setSearch] = useState('');
  const continents = [
    { code: 'AF', name: 'Africa' },
    { code: 'AN', name: 'Antarctica' },
    { code: 'AS', name: 'Asia' },
    { code: 'EU', name: 'Europe' },
    { code: 'NA', name: 'North America' },
    { code: 'OC', name: 'Oceania' },
    { code: 'SA', name: 'South America' }
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded mb-4 w-full"
      />
      <select onChange={handleFilter} className="p-2 border border-gray-300 rounded w-full">
        <option value="">All Continents</option>
        {continents.map(continent => (
          <option key={continent.code} value={continent.code}>
            {continent.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;