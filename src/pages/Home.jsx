import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COUNTRIES } from '../graphql/queries';
import { Link } from 'react-router-dom';
import ContinentFilter from '../components/filterByContinent/FilterByContinent';
import { fetchCountryImage } from '../graphql/fetchCountryFlag';
import Spinner from '../components/spiner/spinner';

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
          const imageUrl = await fetchCountryImage(country.code);
          return { code: country.code, imageUrl };
        });

        const images = await Promise.all(imagesPromises);
        const imagesMap = images.reduce((acc, curr) => {
          acc[curr.code] = curr.imageUrl;
          return acc;
        }, {});

        setCountryImages(imagesMap);
        setFilteredCountries(data.countries);
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

  if (loading) return <Spinner />;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">List of Countries</h1>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          />
        </div>
        <div className="mt-4 md:mt-0">
          <ContinentFilter onFilter={(code) => setSelectedContinent(code)} />
        </div>
      </div>
      {filteredCountries.length === 0 ? (
        <p>No countries found matching the filters.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map(country => (
            <li key={country.code} className="transform transition-transform hover:scale-105">
              <Link to={`/country/${country.code}`} className="block bg-white p-4 rounded shadow hover:shadow-lg no-underline">
                <div className="text-xl font-bold">{country.name}</div>
                {countryImages[country.code] && (
                  <img
                    src={countryImages[country.code]}
                    alt={`${country.name} flag`}
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;