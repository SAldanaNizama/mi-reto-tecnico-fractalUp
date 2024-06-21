import axios from 'axios';

export const fetchCountryImage = async (countryCode) => {
    const primaryBaseUrl = 'https://flagcdn.com';
    const fallbackBaseUrl = 'https://flagsapi.com';

    try {
        // Intenta con la primera API
        const primaryFlagUrl = `${primaryBaseUrl}/${countryCode.toLowerCase()}.svg`;
        await axios.head(primaryFlagUrl);
        return primaryFlagUrl;
    } catch (error) {
        console.warn(`Error fetching flag from primary source for country code ${countryCode}:`, error);
        
        try {
            // Si falla, intenta con la API alternativa
            const fallbackFlagUrl = `${fallbackBaseUrl}/${countryCode}/flat/64.png`;
            await axios.head(fallbackFlagUrl);
            return fallbackFlagUrl;
        } catch (fallbackError) {
            console.error(`Error fetching flag from fallback source for country code ${countryCode}:`, fallbackError);
            return null;
        }
    }
};