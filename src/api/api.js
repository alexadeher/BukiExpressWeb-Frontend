import axios from "axios";

// URL en desarrollo local
const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");
        //console.log("Token en el request interceptor:", token);
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Error en la solicitud:", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        //console.log("Respuesta de la API:", response);
        return response;
    },
    (error) => {
        console.error("Error en la respuesta de la API:", error);
        return Promise.reject(error);
    }
);

export default api;