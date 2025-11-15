import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials)
};

// Characters API
export const charactersAPI = {
  getAll: () => api.get('/characters'),
  getOne: (id) => api.get(`/characters/${id}`),
  create: (characterData) => api.post('/characters', characterData),
  update: (id, characterData) => api.put(`/characters/${id}`, characterData),
  delete: (id) => api.delete(`/characters/${id}`)
};

// Campaigns API
export const campaignsAPI = {
  getAll: () => api.get('/campaigns'),
  getOne: (id) => api.get(`/campaigns/${id}`),
  create: (campaignData) => api.post('/campaigns', campaignData),
  update: (id, campaignData) => api.put(`/campaigns/${id}`, campaignData),
  join: (id) => api.post(`/campaigns/${id}/join`),
  leave: (id) => api.post(`/campaigns/${id}/leave`),
  delete: (id) => api.delete(`/campaigns/${id}`)
};

// Abilities API
export const abilitiesAPI = {
  getAll: () => api.get('/abilities'),
  getOne: (id) => api.get(`/abilities/${id}`)
};

// Monsters API
export const monstersAPI = {
  getAll: () => api.get('/monsters'),
  getOne: (id) => api.get(`/monsters/${id}`)
};

// Lore API
export const loreAPI = {
  getAll: (category) => api.get('/lore', { params: { category } }),
  getOne: (id) => api.get(`/lore/${id}`)
};

export default api;
