import axios from 'axios';
import store from '../store';
import { LOG_OUT_USER } from '../actions/types';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001',
  headrs: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:80',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOG_OUT_USER });
    }
    return Promise.reject(err);
  }
);

export default api;
