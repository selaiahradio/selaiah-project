// ========================================
// SELAIAH RADIO - API SERVICE
// iHostCast Ltd © 2025
// ========================================

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Cliente Axios configurado
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ========================================
// INTERCEPTORES
// ========================================

// Interceptor para añadir token a todas las peticiones
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

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// ========================================
// AUTH ENDPOINTS
// ========================================
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  firebaseLogin: (idToken, gender) => api.post('/auth/firebase-login', { idToken, gender }),
  getCurrentUser: () => api.get('/auth/me'),
  updateFCMToken: (fcmToken) => api.post('/auth/fcm-token', { fcmToken }),
  logout: () => api.post('/auth/logout'),
};

// ========================================
// RADIO ENDPOINTS
// ========================================
export const radioAPI = {
  getNowPlaying: () => api.get('/api/radio/now-playing'),
  updateSong: (songId) => api.post('/api/radio/update-song', { songId }),
  listenerJoin: () => api.post('/api/radio/listener/join'),
  listenerLeave: () => api.post('/api/radio/listener/leave'),
  getStreamInfo: () => api.get('/api/stream'),
};

// ========================================
// SHOWS ENDPOINTS
// ========================================
export const showsAPI = {
  getShows: () => api.get('/api/shows'),
  createShow: (data) => api.post('/api/shows', data),
};

// ========================================
// EVENTS ENDPOINTS
// ========================================
export const eventsAPI = {
  getEvents: () => api.get('/api/events'),
  createEvent: (data) => api.post('/api/events', data),
};

// ========================================
// NEWS ENDPOINTS
// ========================================
export const newsAPI = {
  getNews: (category) => api.get('/api/news', { params: { category } }),
  createNews: (data) => api.post('/api/news', data),
};

// ========================================
// AI CHAT ENDPOINTS
// ========================================
export const aiAPI = {
  sendChatMessage: (message) => api.post('/api/ai/chat', { message }),
};

// ========================================
// ADMIN ENDPOINTS
// ========================================
export const adminAPI = {
  getUsers: () => api.get('/api/admin/users'),
  updateUser: (userId, data) => api.put(`/admin/users/${userId}`, data),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  getSongs: () => api.get('/admin/songs'),
  createSong: (data) => api.post('/admin/songs', data),
  updateSong: (songId, data) => api.put(`/admin/songs/${songId}`, data),
  deleteSong: (songId) => api.delete(`/admin/songs/${songId}`),
  getConfig: () => api.get('/api/admin/config'),
  updateConfig: (category, key, value) => 
    api.put(`/api/admin/config/${category}/${key}`, { value }),
  updateUserRole: (userId, role) => 
    api.put(`/api/admin/users/${userId}/role`, { role }),
};

export default api;
