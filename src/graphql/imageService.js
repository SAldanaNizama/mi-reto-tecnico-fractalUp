const fetchCountryImage = async (countryCode) => {
    try {
        const response = await fetch(`https://www.countryflags.io/${countryCode}/flat/64.png`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status} - ${response.statusText}`);
        }
        
        return response.url; // Devuelve la URL directamente, ya que la API de CountryFlags devuelve imágenes directamente
    } catch (error) {
        console.error(`Error fetching image for ${countryCode}:`, error);
        return null;
    }
};
export default fetchCountryImage;