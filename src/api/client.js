import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dashboardService = {
  getSummary: () => api.get('/stats/summary'),
  getSpecialtyStats: () => api.get('/stats/specialties'),
  getLevelStats: () => api.get('/stats/levels'),
};

export default api;