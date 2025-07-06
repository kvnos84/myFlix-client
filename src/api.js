// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://movie-api-jyp7.onrender.com', // Your deployed backend
});

export default api;