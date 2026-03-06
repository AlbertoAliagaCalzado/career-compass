import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const clean = (obj) => Object.fromEntries(
  Object.entries(obj || {}).filter(([_, v]) => v != null && v !== "")
);

export const dashboardService = {
  getSummary: () => api.get('/stats/summary'),
  getSpecialtyStats: () => api.get('/stats/specialties'),
  getLevels: (params) => api.get('/stats/levels', { params: clean(params) }),
};

export const userService = {
  getAll: (params) => api.get('/users', { params: clean(params) }),
};

export default api;