import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GET_COUNTRY_DETAILS = gql`
  query($code: ID!) {
    country(code: $code) {
      name
      capital
      currency
      languages {
        name
      }
      states {
        code
        name
      }
    }
  }
`;

function CountryDetails() {
  const { code } = useParams();
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code }
  });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (data && data.country) {
      fetchImage(data.country.name);
    }
  }, [data]);

  const fetchImage = async (countryName) => {
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${countryName}`, {
      headers: {
        Authorization: `Client-ID YOUR_UNSPLASH_API_KEY`
      }
    });
    setImageUrl(response.data.results[0]?.urls?.small || '');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { country } = data;
  const languages = country.languages.map(lang => lang.name).join(', ');

  return (
    <div>
      <h1>{country.name}</h1>
      <img src={imageUrl} alt="Country" />
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Currency:</strong> {country.currency}</p>
      <p><strong>Languages:</strong> {languages}</p>
      {country.states.length > 0 && <p><strong>States:</strong></p>}
      <ul>
        {country.states.map(state => (
          <li key={state.code}>{state.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CountryDetails;