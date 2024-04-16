import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
});

// Function to get the token from localStorage

// Set the default Authorization header with the token
api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` ;

export const getAllTaskApi = async (id) => {
    try {
        const response = await api.get(`/user/task/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};

export const getTaskApi = async (id) => {
    try {
        const response = await api.get(`/task/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};
export const deleteTaskApi = async (id) => {
    try {
        const response = await api.delete(`/task/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};
export const chnageTaskStatus = async (id,data) => {
    try {
        const response = await api.put(`/task/status/${id}`,data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};

export const createTaskApi = async (data) => {
    try {
        const response = await api.post('/task', data);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: error.response.data || error};
    }
};

// Add other API functions as needed
