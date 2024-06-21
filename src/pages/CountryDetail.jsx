import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import { GET_COUNTRY_BY_CODE } from '../graphql/queries'; // Importa la query necesaria
import BackButton from '../components/BackButton/BackButton';
import Spinner from "../components/spiner/spinner"
const fetchCountryImage = async (countryName) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${countryName}`, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`
      }
    });
    return response.data.results[0]?.urls?.small || '';
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
};

function CountryDetails() {
  let { code } = useParams();
  const { loading, error, data } = useQuery(GET_COUNTRY_BY_CODE, {
    variables: { code }
  });
  const [imageUrl, setImageUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (data && data.country) {
      const fetchImage = async () => {
        const image = await fetchCountryImage(data.country.name);
        setImageUrl(image);
      };
      fetchImage();
    }
  }, [data]);

  if (loading) return <Spinner/>;
  if (error) return <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">Error 404</p>
        </div>;

  const { country } = data;
  const languages = country.languages.map(lang => lang.name).join(', ');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="fixed top-4 left-4 z-20 lg:left-[280px]">
         <BackButton />
        </div>
        <div className="md:flex">
          {imageUrl && (
            <div className="md:w-1/3">
              <img src={imageUrl} alt={`Flag of ${country.name}`} className="w-full h-auto object-cover" />
            </div>
          )}
          <div className="p-4 md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{country.name}</h1>
            <p className="text-lg"><strong>Capital:</strong> {country.capital}</p>
            <p className="text-lg"><strong>Currency:</strong> {country.currency}</p>
            <p className="text-lg"><strong>Languages:</strong> {languages}</p>
            {country.states.length > 0 && (
              <div className="mt-4">
                <p className="text-lg"><strong>States:</strong></p>
                <input
                  type="text"
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                />
                <div className="overflow-y-auto max-h-40">
                  <ul className="list-disc list-inside">
                    {country.states
                      .filter(state => state.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map(state => (
                        <li key={state.code} className="text-lg">{state.name}</li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
