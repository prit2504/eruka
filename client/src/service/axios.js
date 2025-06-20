import axios from 'axios';

const api = axios.create({baseURL: "http://localhost:7000/api", withCredentials: true});

export const signin = (data) => {
    return api.post('/signin', data);
}

export const signup = (data) => {
    return api.post('/signup', data);
}

export const signout = () => api.post('/signout');

export const getCurrentUser = () => api.get('/me');



export default api;