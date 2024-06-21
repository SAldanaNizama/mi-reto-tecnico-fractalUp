// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const continentsData = [
//   { code: 'AF', name: 'Africa' },
//   { code: 'AN', name: 'Antarctica' },
//   { code: 'AS', name: 'Asia' },
//   { code: 'EU', name: 'Europe' },
//   { code: 'NA', name: 'North America' },
//   { code: 'OC', name: 'Oceania' },
//   { code: 'SA', name: 'South America' }
// ];

// function SearchBar({ onSearch, onFilter }) {
//   const [search, setSearch] = useState('');
//   const [continentImages, setContinentImages] = useState({});
//   const [isContinentMenuOpen, setIsContinentMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     fetchContinentImages();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsContinentMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const fetchContinentImages = async () => {
//     const newContinentImages = {};
//     for (let continent of continentsData) {
//       try {
//         const response = await axios.get(`https://api.unsplash.com/search/photos?query=${continent.name}`, {
//           headers: {
//             Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`
//           }
//         });
//         newContinentImages[continent.code] = response.data.results[0]?.urls?.small || '';
//       } catch (error) {
//         console.error('Error fetching image:', error);
//       }
//     }
//     setContinentImages(newContinentImages);
//   };

//   const handleSearch = (e) => {
//     const { value } = e.target;
//     setSearch(value);
//     onSearch(value);
//   };

//   const handleFilter = (code) => {
//     onFilter(code);
//     setIsContinentMenuOpen(false); // Close the menu when a continent is selected
//   };

//   return (
//     <div className="mb-4 relative">
//       <input
//         type="text"
//         placeholder="Search for a country..."
//         value={search}
//         onChange={handleSearch}
//         className="p-2 border border-gray-300 rounded mb-4 w-full"
//         onClick={() => setIsContinentMenuOpen(true)}
//       />
//       {isContinentMenuOpen && (
//         <div ref={menuRef} className="absolute w-full bg-white shadow-lg rounded mt-1 z-10">
//           {continentsData.map((continent) => (
//             <div
//               key={continent.code}
//               className="p-2 flex items-center cursor-pointer hover:bg-gray-100"
//               onClick={() => handleFilter(continent.code)}
//             >
//               {continentImages[continent.code] && (
//                 <img
//                   src={continentImages[continent.code]}
//                   alt={continent.name}
//                   className="w-10 h-10 rounded-full mr-2 object-cover"
//                 />
//               )}
//               <span>{continent.name}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchBar;

// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function SearchInput({ searchTerm, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      className="p-2 border border-gray-300 rounded mb-4 w-full"
    />
  );
}

export default SearchInput;
