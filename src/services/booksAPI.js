import axios from 'axios';
import { BASE_URL, API_KEY } from '../config';

export default {
  searchBooks(query, startIndex = 0, maxResults = 10) {
    return axios.get(`${BASE_URL}/volumes`, {
      params: {
        q: query,
        startIndex,
        maxResults,
        key: API_KEY
      }
    });
  },

  getBookById(id) {
    return axios.get(`${BASE_URL}/volumes/${id}`, {
      params: {
        key: API_KEY
      }
    });
  }
};