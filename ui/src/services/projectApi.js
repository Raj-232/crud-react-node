import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});

// Function to get the token from localStorage

// Set the default Authorization header with the token
api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` ;

export const getAllProjectApi = async (id) => {
    try {
        const response = await api.get(`/user/projects/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};

export const getProjectApi = async (id) => {
    try {
        const response = await api.get(`/projects/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};

export const deleteProjectApi = async (id) => {
    try {
        const response = await api.delete(`/projects/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};

export const createProjectApi = async (data) => {
    try {
        const response = await api.post('/projects', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};

// Add other API functions as needed
