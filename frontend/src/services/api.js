import axios from "axios";

// Create base instance
const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Automatically attach token if found
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

    return config;
    },
    
    (error) => Promise.reject(error)
);

// Auto-logout if token is invalid / expired
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }

        return Promise.reject(error);
    
    }
);

export default API;
