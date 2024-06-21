// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const continentsData = [
  { code: '', name: 'All' },
  { code: 'AF', name: 'Africa' },
  { code: 'AN', name: 'Antarctica' },
  { code: 'AS', name: 'Asia' },
  { code: 'EU', name: 'Europe' },
  { code: 'NA', name: 'North America' },
  { code: 'OC', name: 'Oceania' },
  { code: 'SA', name: 'South America' }
];

// eslint-disable-next-line react/prop-types
function ContinentFilter({ onFilter }) {
  const [continentImages, setContinentImages] = useState({});
  const [isContinentMenuOpen, setIsContinentMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    fetchContinentImages();
  }, []);

  const fetchContinentImages = async () => {
    const newContinentImages = {};
    for (let continent of continentsData) {
      try {
        let response;
        if (continent.code === 'all') {
          newContinentImages[continent.code] = ''; 
        } else {
          response = await axios.get(`https://api.unsplash.com/search/photos?query=${continent.name}`, {
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`
            }
          });
          newContinentImages[continent.code] = response.data.results[0]?.urls?.small || '';
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
    setContinentImages(newContinentImages);
  };

  const handleFilter = (code) => {
    onFilter(code);
    setIsContinentMenuOpen(false); 
  };

  return (
    <div className="relative mb-4 flex justify-end">
      <button
        className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
        onClick={() => setIsContinentMenuOpen(!isContinentMenuOpen)}
      >
        Filter by Continent
      </button>
      {isContinentMenuOpen && (
        <div ref={menuRef} className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10">
          {continentsData.map((continent) => (
            <div
              key={continent.code}
              className="p-2 flex items-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleFilter(continent.code)}
            >
              {continentImages[continent.code] && (
                <img
                  src={continentImages[continent.code]}
                  alt={continent.name}
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                />
              )}
              <span>{continent.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContinentFilter;
