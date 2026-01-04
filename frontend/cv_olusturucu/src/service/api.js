import axios from "axios";

const BASE_URL = "https://cv-olusturucu-0.onrender.com/api"

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },})

api.interceptors.response.use(
    (response) => response,
    (error)=>{
        console.log("API Error: ",error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
