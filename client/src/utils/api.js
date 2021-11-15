import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001',
  headrs: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
});

// Potentially add interceptor for deauth

export default api;
