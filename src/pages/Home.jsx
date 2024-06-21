import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COUNTRIES } from '../graphql/queries';
import { Link } from 'react-router-dom';
import ContinentFilter from '../components/filterByContinent/FilterByContinent';
import { fetchCountryImage } from '../graphql/fetchCountryFlag';

function Home() {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);
  const [countryImages, setCountryImages] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState(null); // Cambiado a null para manejar estado inicial
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.countries) {
        const imagesPromises = data.countries.map(async (country) => {
          const imageUrl = await fetchCountryImage(country.name);
          return { code: country.code, imageUrl };
        });

        const images = await Promise.all(imagesPromises);
        const imagesMap = images.reduce((acc, curr) => {
          acc[curr.code] = curr.imageUrl;
          return acc;
        }, {});

        setCountryImages(imagesMap);
        setFilteredCountries(data.countries); // Inicializar con todos los países
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    if (data && data.countries) {
      let filtered = data.countries;

      if (searchTerm) {
        filtered = filtered.filter(country =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedContinent) {
        filtered = filtered.filter(country =>
          country.continent && country.continent.code === selectedContinent
        );
      }

      setFilteredCountries(filtered);
    }
  }, [searchTerm, selectedContinent, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">List of Countries</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
      </div>
      <ContinentFilter onFilter={(code) => setSelectedContinent(code)} />
      {filteredCountries.length === 0 ? (
        <p>No countries found matching the filters.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map(country => (
            <li key={country.code} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
              <Link to={`/country/${country.code}`} className="text-xl font-bold no-underline hover:underline">
                {country.name} - {country.capital}
              </Link>
              {countryImages[country.code] && (
                <img
                  src={countryImages[country.code]}
                  alt={`${country.name} flag`}
                  className="mt-2 w-full h-48 object-cover rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
