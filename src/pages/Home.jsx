import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COUNTRIES } from '../graphql/queries';
import { Link } from 'react-router-dom';
import ContinentFilter from '../components/filterByContinent/FilterByContinent';
import { fetchCountryImage } from '../graphql/fetchCountryFlag';
import Spinner from '../components/spiner/spinner';
import SearchInput from '../components/searchbar/searchBar';
function Home() {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);
  const [countryImages, setCountryImages] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState(null);
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
  if (error) return <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">Error 404</p>
        </div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Countries</h1>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <SearchInput searchTerm={searchTerm} onSearch={setSearchTerm} />
        <div className="mt-4 md:mt-0">
          <ContinentFilter onFilter={(code) => setSelectedContinent(code)} />
        </div>
      </div>
      {filteredCountries.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">No countries found matching the filters.</p>
        </div>
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