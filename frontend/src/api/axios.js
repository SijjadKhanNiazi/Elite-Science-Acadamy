// frontend/src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Yeh direct cookies ko backend tak carry krne k liye mandatory hai
});

// Extra safety: Explicitly ensure withCredentials is added on every single async request
API.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
