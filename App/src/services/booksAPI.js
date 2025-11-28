import {BASE_URL, API_KEY} from '../config';


export default {
  async searchBooks(title, startIndex = 0, maxResults = 10) {
    try {
      const params = new URLSearchParams({
        q: `intitle:${title}`,
        startIndex,
        maxResults,
        key: API_KEY
      });
      
      const response = await fetch(`${BASE_URL}/volumes?${params}`);
      
      if (!response.ok) {
        throw new Error('Nie udało się pobrać danych');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Błąd podczas pobierania książek:', error);
      throw error;
    }
  }
};