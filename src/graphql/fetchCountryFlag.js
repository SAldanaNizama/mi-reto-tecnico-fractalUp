// api.js

import axios from 'axios';

export const fetchCountryImage = async (countryName) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(countryName)}`;
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
    
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Client-ID ${apiKey}`
            }
        });
        return response.data.results[0]?.urls.regular; // Obtener la URL de la imagen regular
    } catch (error) {
        console.error('Error fetching country image:', error);
        return null;
    }
};
