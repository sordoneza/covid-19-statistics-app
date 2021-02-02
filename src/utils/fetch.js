import axios from 'axios';

const publicFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export { publicFetch };
