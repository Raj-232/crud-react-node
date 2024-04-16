// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});

export const loginApi = async (data) => {
    try {
        const response = await api.post('/login', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};

// Add other API functions as needed
