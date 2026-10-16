import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Backend URL comes from frontend/.env (EXPO_PUBLIC_API_URL).
// Use your computer's local IP (ipconfig / ifconfig), NOT localhost,
// so your phone can reach the backend over Wi-Fi.
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
//add req interceptor for for jwt token injection
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error getting token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
//Add response interceptor for 401 error handling

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('token');
    }
    return Promise.reject(error);
  }
);

export default api;