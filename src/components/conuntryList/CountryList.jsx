import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      continent {
        code
        name
      }
    }
  }
`;

function CountryList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [continent, setContinent] = useState('');

  useEffect(() => {
    if (data) {
      applyFilters();
    }
  }, [data, search, continent]);

  const applyFilters = () => {
    if (data) {
      setFilteredCountries(data.countries.filter(country => {
        return (
          country.name.toLowerCase().includes(search.toLowerCase()) &&
          (continent ? country.continent.code === continent : true)
        );
      }));
    }
  };

  const searchCountry = (search) => {
    setSearch(search);
  };

  const filterByContinent = (continent) => {
    setContinent(continent);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <SearchBar onSearch={searchCountry} onFilter={filterByContinent} />
      <ul>
        {filteredCountries.map(country => (
          <li key={country.code} className="p-2 border-b">
            <Link to={`/country/${country.code}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;