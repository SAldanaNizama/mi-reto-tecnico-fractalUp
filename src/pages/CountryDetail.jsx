import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import axios from 'axios';
import { GET_COUNTRY_BY_CODE } from '../graphql/queries'; // Importa la query necesaria

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
    let { code } = useParams(); // Obtener el parámetro de la URL
    const { loading, error, data } = useQuery(GET_COUNTRY_BY_CODE, {
        variables: { code }
    });
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (data && data.country) {
            const fetchImage = async () => {
                const image = await fetchCountryImage(data.country.name);
                setImageUrl(image);
            };
            fetchImage();
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { country } = data;
    const languages = country.languages.map(lang => lang.name).join(', ');

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl transition-transform transform hover:scale-105">
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">{country.name}</h1>
                {imageUrl && (
                    <div className="h-64 mb-4 overflow-hidden rounded-lg">
                        <img src={imageUrl} alt={`Flag of ${country.name}`} className="w-full h-full object-cover" />
                    </div>
                )}
                <p className="text-lg"><strong>Capital:</strong> {country.capital}</p>
                <p className="text-lg"><strong>Currency:</strong> {country.currency}</p>
                <p className="text-lg"><strong>Languages:</strong> {languages}</p>
                {country.states.length > 0 && <p className="text-lg"><strong>States:</strong></p>}
                <ul className="list-disc list-inside">
                    {country.states.map(state => (
                        <li key={state.code} className="text-lg">{state.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CountryDetails;
